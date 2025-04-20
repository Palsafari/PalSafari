import React from "react";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";
import CountryDropdown from "../components/CountryDropdown";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div className="md:flex mt-3 md:mt-4 flex-col gap-6 items-center justify-center">
      {/* Header Image Section */}
      <div className="w-full relative rounded-2xl overflow-hidden">
        <img
          src={assets.palsafari_reception}
          alt="Contact Us"
          className="w-full h-64 rounded-lg"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-white bg-tertiary/65">
          {t("contactUs2")}
        </h1>
      </div>
      <div className="flex flex-col-reverse md:flex-row mt-6 gap-12 px-6 md:px-8 py-16 mx-auto bg-gray-50 rounded-2xl shadow-inner">
        {/* Contact Info (Left on Desktop, Bottom on Mobile) */}
        <div className="md:w-1/3 space-y-6">
          <h2 className="text-3xl font-extrabold text-tertiary" id="contact-us">
            {t("ourContacts")}
          </h2>
          <p className="text-gray-600 text-sm">{t("ourContacts2")}</p>

          <div className="space-y-4">
            {/* Phone */}
            <a
              href="tel:+14843242400"
              className="flex items-center gap-4 text-tertiary hover:underline text-base"
            >
              <Phone className="w-6 h-6 text-orange-600" />
              484.324.2400
            </a>

            {/* Email */}
            <a
              href="mailto:info@palsafari.com"
              className="flex items-center gap-4 text-tertiary hover:underline text-base"
            >
              <Mail className="w-6 h-6 text-orange-600" />
              info@palsafari.com
            </a>

            {/* Address */}
            <a
              href="https://maps.apple.com/?address=15%20W%20Third%20St,%20Media,%20PA%2019063,%20United%20States"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 text-tertiary hover:underline text-base"
            >
              <MapPin className="w-6 h-6 text-orange-600 mt-1" />
              <span className="leading-snug">
                15 West 3rd St.
                <br />
                Sharja District
                <br />
                United Arab Emirates
              </span>
            </a>
          </div>
        </div>

        {/* Contact Form (Right on Desktop, Top on Mobile) */}
        <div className="md:w-2/3 w-full">
          <form className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200">
            {/* Name Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("firstName")}
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("lastName")}
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("emailAddress")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Country Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("yourCountry")}
              </label>
              <select
                name="country"
                required
                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <CountryDropdown />
              </select>
            </div>

            {/* Reason Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("reasonForContact")}
              </label>
              <select
                name="reason"
                required
                className="w-full border border-gray-300 rounded-md p-3 bg-white focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">{t("selectReason")}</option>
                <option>{t("makeEnquiry")}</option>
                <option>{t("bookingRequest")}</option>
                <option>{t("requestFunds")}</option>
                <option>{t("paymentIssues")}</option>
                <option>{t("makeComplaint")}</option>
                <option>{t("other")}</option>
              </select>
            </div>

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("message")}
              </label>
              <textarea
                name="message"
                placeholder="Please write your message here..."
                rows="4"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary focus:outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary2 hover:scale-105 transition-transform shadow-md"
              >
                {t("sendMessage")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
