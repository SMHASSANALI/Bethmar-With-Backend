import React, { useState, useEffect, useContext } from "react";
import GetContext from "../context/Custom Get Context/Get.Context";
import PostContext from "../context/Custom Post Context/Post.Context";
import PutContext from "../context/Custom Put Context/Put.Context";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const EditHomePage = () => {
  const { getDataFromAPI } = useContext(GetContext);
  const { postDataFromAPI2 } = useContext(PostContext);
  const { putDataFromAPI2 } = useContext(PutContext);

  const [heroId, setHeroId] = useState(null);
  const [formData, setFormData] = useState({
    heroImage: "",
    heroImagePreview: "",
    description: [""],
    clients: [""],
    services: {
      telecom: [""],
      utility: [""],
      traffic: [""],
    },
    about: [],
  });

  useEffect(() => {
    (async () => {
      const data = await getDataFromAPI("home-page/get-home-section");
      if (!data) return;

      setHeroId(data._id);
      setFormData({
        heroImage: data.image || "",
        heroImagePreview: data.image || "",
        description: data.description || [""],
        clients: data.clients || [""],
        services: data.services || {
          telecom: [""],
          utility: [""],
          traffic: [""],
        },
        about: (data.about || []).map((item) => ({
          heading: item.heading || "",
          description: item.description || "",
          imageUrl: item.imageUrl || "",
          imagePreview: item.imageUrl || "",
          SVG: item.SVG || "",
          svgPreview: item.SVG || "",
        })),
      });
    })();
  }, []);

  const compressImage = async (file) => {
    if (!file) return null;

    const options = {
      maxSizeMB: 0.5, // Compress to 0.5 MB
      maxWidthOrHeight: 1024, // Resize large images
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (err) {
      console.error("❌ Compression Error:", err);
      return file; // fallback to original
    }
  };

  const updateAboutField = (index, key, value) => {
    setFormData((prev) => {
      const updatedAbout = [...prev.about];
      updatedAbout[index][key] = value;
      return { ...prev, about: updatedAbout };
    });
  };

  const handleHeroImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedFile = await compressImage(file);

    setFormData((prev) => ({
      ...prev,
      heroImage: compressedFile,
      heroImagePreview: URL.createObjectURL(compressedFile),
    }));
  };

  const handleAboutFileChange = async (index, key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedFile = await compressImage(file);

    updateAboutField(index, key, compressedFile);
    updateAboutField(
      index,
      key === "SVG" ? "svgPreview" : "imagePreview",
      URL.createObjectURL(compressedFile)
    );
  };

  const cleanArray = (arr) => arr.filter((item) => item?.trim?.() !== "");

  const handleSubmit = async () => {
    try {
      const fd = new FormData();

      fd.append(
        "description",
        JSON.stringify(cleanArray(formData.description))
      );
      fd.append("clients", JSON.stringify(cleanArray(formData.clients)));
      fd.append(
        "services",
        JSON.stringify({
          telecom: cleanArray(formData.services.telecom),
          utility: cleanArray(formData.services.utility),
          traffic: cleanArray(formData.services.traffic),
        })
      );

      const aboutList = formData.about.map((item) => ({
        heading: item.heading,
        description: item.description,
        imageUrl: item.imagePreview,
        SVG: item.svgPreview,
      }));

      fd.append("about", JSON.stringify(aboutList));

      if (formData.heroImage && typeof formData.heroImage !== "string") {
        fd.append("heroImage", formData.heroImage);
      }

      formData.about.forEach((item) => {
        if (item.imageUrl && typeof item.imageUrl !== "string") {
          fd.append("aboutImages", item.imageUrl);
        }
        if (item.SVG && typeof item.SVG !== "string") {
          fd.append("aboutSvgs", item.SVG);
        }
      });

      const res = heroId
        ? await putDataFromAPI2(`home-page/update-home-section/${heroId}`, fd)
        : await postDataFromAPI2("home-page/create-home-section", fd);

      toast[res.success ? "success" : "error"](res.message);
    } catch (err) {
      console.error("❌ Submit Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      <div className="fixed top-[150px] right-10 z-[100000]">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
        >
          Save Changes
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Hero Section
          </h2>

          <label className="block mb-2 font-medium text-gray-700">
            Hero Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
          />
          {formData.heroImage && (
            <div className="flex items-center gap-2 justify-between mt-4">
              <img
                src={
                  typeof formData.heroImage === "string"
                    ? formData.heroImage
                    : URL.createObjectURL(formData.heroImage)
                }
                alt="Hero"
                className="rounded-xl max-h-60 object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: null })}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          )}

          {formData.description.map((desc, i) => (
            <div key={i} className="flex gap-2 items-center mt-4">
              <textarea
                value={desc}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updated = [...prev.description];
                    updated[i] = e.target.value;
                    return { ...prev, description: updated };
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-primary/40"
                placeholder={`Hero description #${i + 1}`}
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => {
                    const updated = [...prev.description];
                    updated.splice(i, 1);
                    return { ...prev, description: updated };
                  })
                }
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                description: [...prev.description, ""],
              }))
            }
            className="mt-4 px-4 py-2 text-sm bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
          >
            + Add Description
          </button>
        </div>

        {/* About Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">About</h2>
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  about: [
                    ...prev.about,
                    { heading: "", description: "", imageUrl: "", SVG: "" },
                  ],
                }))
              }
              className="text-sm px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 shadow"
            >
              + Add About Card
            </button>
          </div>
          <section className="flex flex-col-reverse gap-[20px] ">
            {formData.about.map((section, i) => (
              <div
                key={i}
                className="mb-6 border border-gray-300 p-4 rounded-xl relative bg-gray-100"
              >
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => {
                      const updated = [...prev.about];
                      updated.splice(i, 1);
                      return { ...prev, about: updated };
                    })
                  }
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl"
                  title="Remove this card"
                >
                  ✕
                </button>

                <section className="flex flex-row justify-between mt-6">
                  <div className="flex flex-col gap-[10px] w-4/12 bg-gray-200 rounded-md overflow-hidden p-1">
                    <input
                      type="file"
                      accept="image/svg+xml"
                      onChange={(e) => handleAboutFileChange(i, "SVG", e)}
                    />
                    {section.SVG && (
                      <img
                        src={
                          typeof section.SVG === "string"
                            ? section.SVG
                            : URL.createObjectURL(section.SVG)
                        }
                        className="mt-2 max-h-40 object-contain"
                        alt="SVG Preview"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-[10px] w-4/12 bg-gray-200 rounded-md overflow-hidden p-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleAboutFileChange(i, "imageUrl", e)}
                      className="mt-2"
                    />
                    {section.imageUrl && (
                      <img
                        src={
                          typeof section.imageUrl === "string"
                            ? section.imageUrl
                            : URL.createObjectURL(section.imageUrl)
                        }
                        className="mt-2 max-h-40 object-cover"
                        alt="Image Preview"
                      />
                    )}
                  </div>
                </section>
                <div className="">
                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) =>
                      setFormData((prev) => {
                        const about = [...prev.about];
                        about[i].heading = e.target.value;
                        return { ...prev, about };
                      })
                    }
                    placeholder="Heading"
                    className="mt-3 w-full p-3 border border-gray-300 rounded-xl"
                  />
                  <textarea
                    rows="3"
                    value={section.description}
                    onChange={(e) =>
                      setFormData((prev) => {
                        const about = [...prev.about];
                        about[i].description = e.target.value;
                        return { ...prev, about };
                      })
                    }
                    placeholder="Description"
                    className="mt-3 w-full p-3 border border-gray-300 rounded-xl resize-none"
                  />
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Services Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary mb-6">Services</h2>
          <section className="flex flex-col gap-[20px]">
            {Object.entries(formData.services).map(([key, list]) => (
              <div key={key} className="mb-6">
                <label className="block text-gray-700 font-semibold text-lg mb-3 capitalize">
                  {key === "telecom"
                    ? "Telecom Design and Planning"
                    : key === "utility"
                    ? "Utility Civil Engineering"
                    : "Traffic Management"}
                </label>
                <div className="flex flex-col gap-[10px]">
                  <ul className="space-y-2">
                    {list.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) =>
                            setFormData((prev) => {
                              const services = { ...prev.services };
                              services[key][index] = e.target.value;
                              return { ...prev, services };
                            })
                          }
                          className="w-full p-3 border border-gray-300 rounded-xl"
                          placeholder={`Service ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => {
                              const services = { ...prev.services };
                              services[key].splice(index, 1);
                              return { ...prev, services };
                            })
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => {
                        const services = { ...prev.services };
                        services[key].push("");
                        return { ...prev, services };
                      })
                    }
                    className="ml-auto w-fit mt-2 px-4 py-2 text-sm bg-primary text-white rounded-lg shadow hover:bg-primary/90"
                  >
                    + Add Service
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Clients Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-primary mb-6">Clients</h2>

          {formData.clients.map((client, i) => (
            <div key={i} className="flex gap-2 items-start mb-6">
              <div className="w-full">
                <input
                  type="url"
                  value={client}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || value.endsWith(".png")) {
                      setFormData((prev) => {
                        const updated = [...prev.clients];
                        updated[i] = value;
                        return { ...prev, clients: updated };
                      });
                    } else {
                      toast.warning("Only .png image links are allowed");
                    }
                  }}
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  placeholder={`Client logo .png URL #${i + 1}`}
                />
                {client && client.endsWith(".png") && (
                  <img
                    src={client}
                    alt={`Client ${i + 1}`}
                    className="mt-2 max-h-20 object-contain rounded"
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => {
                    const updated = [...prev.clients];
                    updated.splice(i, 1);
                    return { ...prev, clients: updated };
                  })
                }
                className="text-red-600 hover:text-red-800 mt-3"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                clients: [...prev.clients, ""],
              }))
            }
            className="mt-2 px-4 py-2 text-sm bg-primary text-white rounded-lg shadow hover:bg-primary/90"
          >
            + Add PNG Logo Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHomePage;
