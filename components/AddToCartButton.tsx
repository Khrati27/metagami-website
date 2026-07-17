"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

export default function AddToCartButton({
  product,
}: {
  product: any;
}) {

  const { addToCart, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();


  const [status, setStatus] = useState<
    "idle" | "loading" | "added"
  >("idle");



  // ==========================
  // SHOPIFY OPTIONS
  // ==========================


  const colorOption = product.options?.find(
    (o: any) =>
      o.name.toLowerCase().includes("renk") ||
      o.name.toLowerCase().includes("color") ||
      o.name.toLowerCase().includes("finish")
  );


  const sizeOption = product.options?.find(
    (o: any) =>
      o.name.toLowerCase().includes("boyut") ||
      o.name.toLowerCase().includes("size")
  );



  // ==========================
  // SELECTED OPTIONS
  // ==========================


  const [selectedColor, setSelectedColor] = useState(
    colorOption?.values?.[0] ?? ""
  );


  const [selectedSize, setSelectedSize] = useState(
    sizeOption?.values?.[0] ?? ""
  );



  // ==========================
  // FIND SELECTED VARIANT
  // ==========================


  const selectedVariant = useMemo(() => {

    return (

      product.variants.find((variant: any) => {

        return variant.selectedOptions.every((option: any) => {

          const name = option.name.toLowerCase();


          if (
            name.includes("renk") ||
            name.includes("color") ||
            name.includes("finish")
          ) {

            return option.value === selectedColor;

          }


          if (
            name.includes("boyut") ||
            name.includes("size")
          ) {

            return option.value === selectedSize;

          }


          return true;

        });


      }) || product.variants[0]

    );

  }, [
    selectedColor,
    selectedSize,
    product
  ]);




  // ==========================
  // INITIALIZE OPTIONS
  // ==========================


  useEffect(() => {

    if (!selectedVariant) return;


    selectedVariant.selectedOptions.forEach(
      (option: any) => {

        const name = option.name.toLowerCase();


        if (
          name.includes("renk") ||
          name.includes("color") ||
          name.includes("finish")
        ) {

          setSelectedColor(option.value);

        }


        if (
          name.includes("boyut") ||
          name.includes("size")
        ) {

          setSelectedSize(option.value);

        }

      }
    );


  }, []);




  // ==========================
  // PRICE
  // ==========================


  const rawPriceInTRY =
    selectedVariant?.price ??
    product.price ??
    0;


  const formattedPrice =
    formatPrice(rawPriceInTRY);




  // ==========================
  // ADD TO CART
  // ==========================


  const handleAdd = async () => {

    if (!selectedVariant) return;


    setStatus("loading");


    await new Promise((resolve) =>
      setTimeout(resolve, 450)
    );


    addToCart({

      id: product.id,

      variantId: selectedVariant.id,

      title: product.title,

      image: product.image,

      price: selectedVariant.price,

    });


    openCart();


    setStatus("added");


    setTimeout(() => {

      setStatus("idle");

    }, 1200);

  };




  return (

    <div className="space-y-10">


      {/* COLOR / FINISH */}

      {colorOption && (

        <div>

          <h3
            className="
              font-display
              text-[11px]
              tracking-[0.35em]
              uppercase
              mb-4
            "
          >
            {t("product.finish")}
          </h3>


          <div className="flex flex-wrap gap-3">


            {colorOption.values.map((color: string) => {

              const active =
                selectedColor === color;


              return (

                <button

                  key={color}

                  type="button"

                  onClick={() =>
                    setSelectedColor(color)
                  }

                  className={`

                    px-5
                    py-3
                    border
                    uppercase
                    text-[11px]
                    tracking-[0.25em]
                    transition-all
                    duration-300

                    ${
                      active

                      ? "bg-black text-white border-black"

                      : "border-zinc-300 hover:border-black text-black"

                    }

                  `}

                >

                  {active && (
                    <span className="mr-2">
                      ✓
                    </span>
                  )}

                  {color}

                </button>

              );

            })}


          </div>

        </div>

      )}






      {/* SIZE */}


      {sizeOption && (

        <div>


          <h3
            className="
              font-display
              text-[11px]
              tracking-[0.35em]
              uppercase
              mb-4
            "
          >

            {t("product.size")}

          </h3>



          <div className="flex flex-wrap gap-3">


            {sizeOption.values.map((size: string) => {


              const active =
                selectedSize === size;



              return (

                <button

                  key={size}

                  type="button"

                  onClick={() =>
                    setSelectedSize(size)
                  }


                  className={`

                    min-w-[80px]
                    py-3
                    px-4
                    border
                    uppercase
                    text-[11px]
                    tracking-[0.25em]
                    transition-all
                    duration-300

                    ${
                      active

                      ? "border-black bg-black text-white"

                      : "border-zinc-300 hover:border-black text-black"

                    }

                  `}

                >

                  {size}

                </button>

              );


            })}


          </div>


        </div>

      )}







      {/* PRICE */}


      <div
        key={selectedVariant?.id}
        className="transition-all duration-300"
      >

        <div
          className="
            font-display
            text-[11px]
            tracking-[0.35em]
            uppercase
            text-metagami-muted
            mb-2
          "
        >

          {t("product.price")}

        </div>


        <div
          className="
            font-display
            text-4xl
            font-black
            tracking-tight
          "
        >

          {formattedPrice}

        </div>


      </div>






      {/* STOCK */}


      {!selectedVariant?.availableForSale && (

        <div
          className="
            text-red-600
            uppercase
            tracking-[0.25em]
            text-sm
          "
        >

          {t("product.outOfStock")}

        </div>

      )}






      {/* BUTTON */}


      <button

        onClick={handleAdd}

        disabled={
          !selectedVariant?.availableForSale ||
          status !== "idle"
        }


        className="
          group
          w-full
          border
          border-black
          py-5
          uppercase
          tracking-[0.35em]
          font-display
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
        "

      >


        {status === "idle" && (

          <span className="inline-flex items-center gap-3">

            {t("product.addToCart")}

            <span
              className="
                transition-transform
                duration-300
                group-hover:translate-x-2
              "
            >
              →
            </span>

          </span>

        )}



        {status === "loading" && (

          <span className="animate-pulse">

            {t("product.adding")}

          </span>

        )}




        {status === "added" && (

          <span>

            {t("product.addedToCart")}

          </span>

        )}



      </button>


    </div>

  );

}