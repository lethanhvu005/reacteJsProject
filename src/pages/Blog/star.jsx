import { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../../contexts/authContext";
import API from "../../services/api";
import Err from "../User/err";
import { useParams } from "react-router-dom";

export default function Star() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const { auth } = useContext(AuthContext);
  const [err, setErr] = useState({});
  useEffect(() => {
    if (!id) {
      return;
    }
    API.get(`blog/rate/${id}`)
      .then((res) => {
        const rates = Object.values(res.data.data ?? {});
        const total = rates.reduce((sum, item) => sum + Number(item.rate), 0);
        const avg = rates.length > 0 ? total / rates.length : 0;
        setRating(avg);
        console.log(res.data);
        console.log(`total:${total}`);
        console.log(`avg:${avg}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleRating = (rate) => {
    setRating(rate);
    clickStar(rate);
  };
  function clickStar(rate) {
    if (!auth) {
      return setErr({ rating: "Vui lòng đăng nhập trước khi đánh giá" });
    } else {
      const token = localStorage.getItem("token");
      let data = {
        blog_id: id,
        user_id: auth.id,
        rate: rate,
      };
      API.post(`blog/rate/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log(res.data);
          alert("đánh giá thành công");
        })
        .catch((error) => {
          console.log(error);
          alert("Đánh giá thất bại");
        });
    }
  }

  return (
    <div>
      <Err err={err}></Err>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={35}
        transition
        fillColor="gold"
        emptyColor="gray"
      />
    </div>
  );
}
