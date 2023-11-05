import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { loadSeller } from "../../actions/sellerAction";
import { useDispatch } from "react-redux";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          axios
            .post(`/api/v2/shop-activation`, {
              activation_token,
            })
            .then((res) => {
              dispatch(loadSeller());
            })
            .catch((err) => {
              //
            });
        } catch (error) {
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token, dispatch]);

  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="container"
    >
      {error ? (
        <p> Your Token is expired!</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <p>Your account is created successfully</p>
          <button
            style={{ display: "block" }}
            className="btn-main"
            onClick={() => navigate("/shop-dashboard")}
          >
            Go To Dashbaord
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
