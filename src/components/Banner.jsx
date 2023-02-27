import React from "react";

export default function Banner() {
  return (
    <div className="text-white w-full">
      <div className="flex justify-end">
        <div className="w-7/12 flex justify-end">
          <div className="pt-sans-narrow pt-28 w-[600px] ">
            <div className="text-8xl font-semibold">Life is Better With AI</div>
            <div className="mt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              optio totam nemo suscipit incidunt quasi rem tempore quidem illum
              aliquam voluptas quaerat est facilis alias quas, atque unde porro?
              Temporibus!
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <div></div>
          <div className="-ml-10 blob"></div>
          {/* <div className="blob-reflection h-10"></div> */}
        </div>
      </div>
    </div>
  );
}
