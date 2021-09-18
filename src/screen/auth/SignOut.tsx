import React, { useEffect, useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";

function SignOut() {
  const { signOut } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    signOut();
    history.push("/");
  });
  return (
    <div>
      <p>Adios</p>
    </div>
  );
}

export default SignOut;
