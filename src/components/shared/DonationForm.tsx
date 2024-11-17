"use client";

import { createDonation } from "@/actions/donationAction";
import { Coffee } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function DonationForm() {
  const [numberInValue, setNumberInValue] = useState("1");
  const [amount, setAmount] = useState(1);
  const [crypto, setCrypto] = useState("btc");

  useEffect(() => {
    if (numberInValue) {
      const intValue = parseInt(numberInValue);
      if (intValue > 5 && intValue <= 1000) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInValue]);


  async function handleFormSubmit(formData: FormData) {
    formData.set('amount', amount.toString());
    formData.set('crypto', crypto);
    // formData.set('email', email);
    const url = await createDonation(formData);
    if (!url) {
      return;
    }
    if (url && window && window.location) {
      window.location.href = url;
    }
  }



  return (
    <form action={handleFormSubmit}>
      <div className="w-full rounded-xl flex justify-between items-center px-5 mt-5">
        <Coffee size={40} />

        <span className="text-xl">X</span>
        <button
          type="button"
          onClick={() => {
            setAmount(1);
            setNumberInValue("1");
          }}
          className={"amount " + (amount === 1 ? "active" : "")}
        >
          1
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(3);
            setNumberInValue("3");
          }}
          className={"amount " + (amount === 3 ? "active" : "")}
        >
          3
        </button>
        <button
          type="button"
          onClick={() => {
            setAmount(5);
            setNumberInValue("5");
          }}
          className={"amount " + (amount === 5 ? "active" : "")}
        >
          5
        </button>
        <input
          placeholder="10"
          type="number"
          className="w-12 py-2 pl-1 border-2 border-black"
          onChange={(e) => {
            setNumberInValue(e.target.value);
          }}
          defaultValue={numberInValue}
        />
      </div>

      <div className="mt-6 px-5 text-xl">
        <input type="text" name="name" placeholder="Your Name" />
      </div>
      <div className="mt-4 px-5 text-xl">
        <textarea name="message" id="" placeholder="say something nice :)"></textarea>
      </div>
      <div className="mt-4 px-5">
        <h3 className="text-xs text-gray-500 mb-1">
          Pay with selected crypto or with cc
        </h3>
        <div className="mt-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCrypto("btc")}
            className={"crypto " + (crypto === "btc" ? "active" : "")}
          >
            <span>BTC</span>
            <p>Bitcoin</p>
          </button>
          <button
            type="button"
            onClick={() => setCrypto("eth")}
            className={"crypto " + (crypto === "eth" ? "active" : "")}
          >
            <span>ETH</span>
            <p>Ethereum</p>
          </button>
          <button
            type="button"
            onClick={() => setCrypto("ltc")}
            className={"crypto " + (crypto === "ltc" ? "active" : "")}
          >
            <span>LTC</span>
            <p>Litecoin</p>
          </button>
        </div>
      </div>
      <div className=" flex items-center justify-center ">
        <button
          type="button"
          className="px-8 py-3 mt-4 w-fit rounded-full bg-yellow-300 mb-5"
        >
          Support {`$${amount * 5}`}
        </button>
      </div>
    </form>
  );
}
