import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="min-h-[200vh] xl:w-[80vw] xsm:w-[90vw] m-auto">
      <div className="min-h-[195vh] xl:w-[80vw] xsm:w-[90vw] bg-[#fff]  mt-5 shadow-xl">
        <h1 className="xl:text-[22px] xsm:text-[12px] w-[55vw] m-auto pt-10">
          Welcome to our e-commerce website! We are excited to provide you with
          a seamless shopping experience that is easy, enjoyable, and secure.
        </h1>
        <div className="xsm:flex xsm:flex-col xl:grid xl:grid-cols-2 pt-16 xl:gap-y-28 xl:ml-28">
          <div className="pb-[2vh]">
            <Image
              width={100}
              height={100}
              alt="logo"
              src="/assets/about.jpg"
              className="w-fit rounded-full xsm:h-[15vh]  md:h-[20vw] xsm:m-auto xl:h-[32vh] xl:ml-20"
            />
          </div>
          <div>
            <div className="xl:text-md xl:w-[35vw] bg-[--third-color] p-5 text-white rounded-md pb-[2vh]">
              <h1 className="xsm:text-5xl xl:text-6xl ">About Us </h1>
              <p className="tracking-wider pt-3">
                At our online shopping website, we are dedicated to providing
                our customers with a seamless shopping experience from start to
                finish. We believe in offering transparent and fair pricing for
                our products, and we work hard to keep our prices competitive
                and affordable without compromising on quality.
              </p>

              <p className="tracking-wider pt-3">
                We believe that everyone deserves access to quality products,
                and that&apos;s why we offer a diverse range of products to suit
                different tastes and budgets. Our team is constantly updating
                our inventory with the latest and greatest products, so you can
                find what you need and want all in one place.
              </p>
            </div>
          </div>
          <div className="pt-[2vh]">
            <div className="xl:text-md xl:w-[35vw] bg-[--third-color] p-5 text-white rounded-md">
              <p className="text-xl tracking-wider pt-3">
                At our online shopping website, we are dedicated to providing
                our customers with a seamless shopping experience from start to
                finish. We believe in offering transparent and fair pricing for
                our products, and we work hard to keep our prices competitive
                and affordable without compromising on quality.
              </p>
              <p className="text-xl tracking-wider pt-3">
                We believe that everyone deserves access to quality products,
                and that&apos;s why we offer a diverse range of products to suit
                different tastes and budgets. Our team is constantly updating
                our inventory with the latest and greatest products, so you can
                find what you need and want all in one place.
              </p>
            </div>
          </div>
          <div className="pt-[2vh]">
            <Image
              width={100}
              height={100}
              alt="logo"
              src="/assets/about2.jpg"
              className="w-fit rounded-full xsm:h-[15vh] md:h-[20vw] xsm:m-auto xl:h-[32vh] xl:ml-20"
            />
          </div>
          <div className="pt-[2vh]">
            <Image
              width={100}
              height={100}
              alt="logo"
              src="/assets/about4.avif"
              className="w-fit rounded-full xsm:h-[15vh] md:h-[20vw] xsm:m-auto xl:h-[32vh] xl:ml-20"
            />
          </div>
          <div className="pt-[2vh]">
            <div className="xl:text-md xl:w-[35vw] bg-[--third-color] p-5 text-white rounded-md ">
              <p className="text-xl tracking-wider pt-3">
                We understand that shopping online can be daunting, which is why
                we have taken extra measures to ensure the safety and security
                of your personal and payment information. Our website uses the
                latest security measures to protect your data, and we never
                share or sell your information to third parties.
              </p>
              <p className="text-xl tracking-wider pt-3">
                We are committed to providing exceptional customer service, and
                we strive to respond to all inquiries in a timely and
                professional manner. If you have any questions or concerns,
                please don&apos;t hesitate to contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
