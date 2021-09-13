import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";

function SignOut() {
  const { fnsignOut } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    fnsignOut();
    history.push("/");
  });
  return (
    <div>
      <p>Adios</p>
    </div>
  );
}

export default SignOut;
