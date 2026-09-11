"use client";
import React, { useState } from "react";
import Link from "next/link";

const initialForm = {
  id: "",
  category: "",
  name: "",
  title: "",
  image: "",
  address: "",
  extra: "",
  link: "",
  open: "",
  coordinates: "",
};

const AddVenueForm = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      const coordinates = JSON.parse(form.coordinates);

      if (
        !Array.isArray(coordinates) ||
        coordinates.length !== 2 ||
        coordinates.some(
          (coordinate) =>
            typeof coordinate !== "number" || !Number.isFinite(coordinate),
        )
      ) {
        throw new Error(
          "Coordinates must be an array of two numbers, e.g. [4.875104, 52.383004]",
        );
      }

      const response = await fetch("/api/admin/addVenue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          open: form.open
            .split("\n")
            .map((entry) => entry.trim())
            .filter(Boolean), //removes empty lines (falsy)
          coordinates,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to add venue");
      }

      setForm(initialForm);
      setStatus({ type: "success", message: "Venue added successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  const inputClass =
    "w-full rounded border-2 border-white px-3 py-2 text-white focus:outline-none";

  const fields = [
    ["id", "ID", "text", true, "jaski-art-gallery"],
    ["name", "Name", "text", true, "Name"],
    ["title", "Title", "text", false, "Title"],
    ["image", "Image filename", "text", true, "image.jpg"],
    [
      "category",
      "Category",
      "text",
      true,
      "gallery, museum, artcenter, public",
    ],
    ["address", "Address", "text", false, "Address"],
    ["link", "Website", "url", false, "https://www.example.com"],
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 grid w-full max-w-2xl gap-4 rounded-xl border-2 border-white px-8 pb-8 pt-6 shadow-md max-sm:px-4"
    >
      {fields.map(([name, label, type, required, placeholder]) => (
        <label
          key={name}
          className="grid gap-1 text-sm font-bold text-white"
          htmlFor={name}
        >
          {label}
          <input
            className={inputClass}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            required={required}
          />
        </label>
      ))}

      <label
        className="grid gap-1 text-sm font-bold text-white"
        htmlFor="extra"
      >
        Description
        <textarea
          className={inputClass}
          id="extra"
          name="extra"
          rows="5"
          placeholder="What's all about"
          value={form.extra}
          onChange={handleChange}
        />
      </label>
      <label className="grid gap-1 text-sm font-bold text-white" htmlFor="open">
        Opening hours <span className="font-normal">(one entry per line)</span>
        <textarea
          className={inputClass}
          id="open"
          name="open"
          rows="5"
          placeholder={"Tuesday:10:00 - 18:00\nWednesday:10:00 - 18:00"}
          value={form.open}
          onChange={handleChange}
        />
      </label>
      <label
        className="grid gap-1 text-sm font-bold text-white"
        htmlFor="coordinates"
      >
        Coordinates
        <span className="font-normal">[longitude, latitude]</span>
        <input
          className={inputClass}
          id="coordinates"
          name="coordinates"
          type="text"
          placeholder="[4.875104, 52.383004]"
          value={form.coordinates}
          onChange={handleChange}
          required
        />
      </label>
      {status.message && (
        <p
          className={
            status.type === "error" ? "text-red-200" : "text-green-200"
          }
          role="status"
        >
          {status.message}
        </p>
      )}
      <button
        type="submit"
        className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-950 cursor-pointer mt-4
      bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(120,69,21,.4)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
      >
        Submit
      </button>

      <Link
        href="/admin"
        className="w-full rounded-full py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-950 cursor-pointer
      bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(120,69,21,.5)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-bottom tracking-widest"
      >
        Back
      </Link>
    </form>
  );
};

export default AddVenueForm;
