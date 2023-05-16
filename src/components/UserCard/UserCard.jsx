import './userCard.scss';

import { useCallback, useEffect, useState } from "react";
import coverPhoto from "../../assets/photo-cover.svg";

export const UserCard = ({ data }) => {
  const [formatPhone, setFormatedPhone] = useState(null)
  const {
    name,
    photo,
    position,
    email,
    phone,
  } = data;

  const getFormatPhone = useCallback(() => {
    const phoneNumber = phone;
    const pattern = /^\+38(\d{3})(\d{3})(\d{2})(\d{2})$/;
    const formattedNumber = phoneNumber.replace(pattern, "+38 ($1) $2-$3-$4");

    setFormatedPhone(formattedNumber);
  }, [])

  useEffect(() => {
    getFormatPhone();
  }, [])

  return (
    <li className="user">
      <img
        src={
          photo.endsWith("jpeg")
          || photo.endsWith("jpg") ?
          (photo) : (coverPhoto)
        }
        alt="user photo"
        className="user__photo"
      />

      <p className="user__name">
        {name}
      </p>

      <div className="user__summary">
        <p
          className="user__position"
          title={position}
        >
          {position}
        </p>

        <a
          href={`mailto:${email}`}
          className="user__email"
          title={email}
        >
          {email}
        </a>

        <a
          href={`tel:${formatPhone}`}
          className="user__phone"
        >
          {formatPhone || "+38 (XXX) XXX - XX - XX"}
        </a>
      </div>
    </li>
  )
}
