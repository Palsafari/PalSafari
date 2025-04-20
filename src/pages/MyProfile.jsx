import React, { useState } from "react";
import { assets } from "../assets/assets";
import CountryDropdown from "../components/CountryDropdown";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    country: "United States",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
    // TODO: Save to backend
  };

  const getInputClasses = () => {
    return isEditing
      ? "w-full p-2 rounded border border-gray-400 focus:border-2 focus:border-primary outline-none bg-white"
      : "w-full p-2 rounded border border-gray-200 bg-gray-100 pointer-events-none";
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-200 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-gray-50 p-6 sm:p-10 rounded-xl shadow-md space-y-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={assets.profile_pic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-tertiary mb-3"
          />
          <h2 className="text-xl font-semibold text-tertiary">
            {profileData.firstName} {profileData.lastName}
          </h2>
        </div>

        {/* Info Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">{t("firstName")}</label>
              <input
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={getInputClasses()}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("lastName")}</label>
              <input
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={getInputClasses()}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("email")}</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={getInputClasses()}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("phone")}</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={getInputClasses()}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("country")}</label>
              <select
                name="country"
                value={profileData.country}
                onChange={handleChange}
                disabled={!isEditing}
                className={getInputClasses()}
              >
                <CountryDropdown />
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">{t("gender")}</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={getInputClasses()}
              >
                <option value="Male">{t("male")}</option>
                <option value="Female">{t("female")}</option>
                <option value="Other">{t("other")}</option>
              </select>
            </div>
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={toggleEdit}
            className={`mt-4 font-semibold px-5 py-2 rounded-full text-sm transition-transform ${
              isEditing
                ? "bg-primary text-white hover:bg-primary2 hover:scale-105 hover:cursor-pointer"
                : "border border-primary text-primary hover:text-primary2 hover:border-primary2 hover:scale-105 hover:cursor-pointer"
            }`}
          >
            {isEditing ? t("save") : t("edit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
