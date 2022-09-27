import React from "react";
import { Link } from "react-router-dom";
import { GnbMenu } from "../../../types";

const menus: GnbMenu[] = [
  { link: "/", text: "홈" },
  { link: "/products", text: "상품목록" },
  { link: "/cart", text: "장바구니" },
];

const Gnb = () => {
  return (
    <div className="GlobalNavigationBar">
      <ul className="GlobalNavigationBar__list">
        {menus.map((menu, i) => {
          const { link, text } = menu;
          return (
            <li key={i}>
              <Link to={link}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Gnb;
