import Image from "next/image";
import React from "react";

const Offers = () => {
  const offerDats = [
    {
      id: 1,
      title: "Best Price & offers",
      subTitle: "Orders $50 or more",
      pic: "1",
    },
    {
      id: 2,
      title: "Free delivery",
      subTitle: "24/7 amazing services",
      pic: "2",
    },
    {
      id: 3,
      title: "Great daily deal",
      subTitle: "When you sign up",
      pic: "3",
    },
    {
      id: 4,
      title: "Wide assortment",
      subTitle: "Mega Discounts",
      pic: "4",
    },
    {
      id: 5,
      title: "Easy returns",
      subTitle: "Within 30 days",
      pic: "5",
    },
  ];
  return (
    <div className="xsm:w-[90vw] xl:w-[80vw] m-auto mt-[2vh]">
      <div className="xsm:flex xsm:flex-col md:grid md:grid-cols-2 xl:flex  xl:flex-row gap-3 justify-between">
        {offerDats.map((res, index) => {
          return (
            <div
              key={index}
              className="card xsm:h-[12vh]  xl:w-[15vw] xl:h-[14vh] bg-white shadow-lg p-2 rounded-2xl flex flex-row items-center justify-center gap-x-2"
            >
              <Image
                src={`/assets/tags/${index + 1}.png`}
                width={50}
                height={50}
                className="rounded-xl xsm:!w-[50px] sm:!w-[10%] xl:!w-[20%]"
                alt="logo"
              />
              <div className="flex flex-col">
                <div>{res.title}</div>
                <div>{res.subTitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
