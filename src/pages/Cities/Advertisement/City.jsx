import React, { useState, useEffect } from "react";
import styled from "./city.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const City = ({ title, content, publishedAt, urlToImage, description }) => {
  let localdata = {
    title: title,
    content: content,
    img: urlToImage,
    des: description,
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=b6f591e710ed4d32a7e03e9844f731ea"
      )
      .then((res) => setData(res.data.articles))
      .catch((e) => console.log(e));
  }, []);
  const newpage = () => {
    navigate("./NewPage.jsx");
    localStorage.setItem("new",JSON.stringify(localdata));
  };
  return (
    <div className={styled.citytop}>
      <hr></hr>
      {data.map((el) => {
        return (
          <div
            onClick={newpage}
            className="card mb-3 ml-4"
            style={{ maxWidth: "640px",marginLeft:"20px", marginRight:"10px",justifyContent: "center" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={el.urlToImage}
                  className="img-fluid rounded-start"
                  alt="..."
                />
                <p>{el.author}</p>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title ">{el.title}</h5>
                  <p className="card-text ">{el.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{el.publishedAt}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default City;
