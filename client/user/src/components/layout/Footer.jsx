import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {

  const [showPolicy, setShowPolicy] =
    useState(false);

  return (

    <footer className="bg-base-200 py-8 text-center mt-10">

      <div className="flex flex-col items-center gap-4">

        <img
          src="/gogoal-logo.png"
          alt="GoGoal"
          className="w-16 h-16 rounded-3xl"
        />

        <p>
          &copy; {new Date().getFullYear()} GoGoal.
          All rights reserved
        </p>

        <p>
          Developed with ❤ by{" "}
          <a
            href="https://github.com/RijoKsd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Mohammad Khalil
          </a>
        </p>
       
        <p>
          لمجتمع ⚽ كرة القدم في الأردن
        </p>

        <button
          onClick={() => setShowPolicy(true)}
          className="text-green-500 hover:underline"
        >
          سياسة الخصوصية
        </button>

        <div className="flex gap-6 text-3xl mt-2">

          <a
  href="https://wa.me/962788246916"
  target="_blank"
  rel="noopener noreferrer"
>
            <FaWhatsapp className="hover:text-green-500 transition" />
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>

        </div>

      </div>

      {showPolicy && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-white text-black p-8 rounded-3xl max-w-lg w-[90%]">

            <h2 className="text-3xl font-bold mb-4">
              سياسة الخصوصية
            </h2>

            <p className="leading-8 text-gray-700">

              نحن نحترم خصوصية المستخدمين داخل GoGoal.
              جميع المعلومات المستخدمة بالموقع
              تُستخدم فقط لتنظيم المباريات والحجوزات،
              ولا يتم مشاركة أي بيانات مع أي طرف خارجي.

            </p>

            <button
              onClick={() => setShowPolicy(false)}
              className="btn bg-black text-white border-none mt-6 w-full"
            >
              إغلاق
            </button>

          </div>

        </div>

      )}

    </footer>

  );

};

export default Footer;