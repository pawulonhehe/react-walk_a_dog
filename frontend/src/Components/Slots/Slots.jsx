import React from "react";
import { Slot } from "../SingleSlot/SingleSlot";
import "./Slots.scss";

export const Slots = () => {
  return (
    <div className="slots">
      <Slot />
      <Slot />
      <Slot />
      <Slot />
      <Slot />
    </div>
  );
};
