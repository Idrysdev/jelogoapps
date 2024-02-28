import React, { createContext, useState } from "react";
import Data from "../components/Data";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { keyboard } = Data;

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [code, setCode] = useState("");
  const [selectedType, setSelectedType] = useState("CNI");
  const [montant, setMontant] = useState(0);
  const [imageUser, setImageUser] = useState();
  const [imageCNI_RectoBD, setImageCNI_RectoBD] = useState(null);
  const [imageCNI_VersoBD, setImageCNI_VersoBD] = useState(null);

  const [validate, setValidate] = useState(false);
  const [contactSelect, setContactSelect] = useState([]);
  const [scanned, setScanned] = useState(false);
  const [otp, setOtp] = useState('');
  const [balance, setBalance] = useState(0);

  //

  const tabl = [];
  while (tabl.length != 10) {
    let random = Math.floor(Math.random() * keyboard.length);
    let bol = true;
    for (let a = 0; a < tabl.length; a++) {
      if (tabl[a] == random) {
        bol = false;
      }
    }
    if (bol) {
      tabl.push(random);
    }
  }
  tabl.push(<AntDesign name="delete" size={22} color="black" />);
  tabl.splice(
    8,
    0,
    <FontAwesome5 name="fingerprint" size={22} color="black" />
  );

  const tablVerif = [];
  while (tablVerif.length != 10) {
    let random = Math.floor(Math.random() * keyboard.length);
    let bol = true;
    for (let a = 0; a < tabl.length; a++) {
      if (tablVerif[a] == random) {
        bol = false;
      }
    }
    if (bol) {
      tablVerif.push(random);
    }
  }
  tablVerif.push(<AntDesign name="delete" size={22} color="black" />);
  tablVerif.splice(8, 0, null);

  //
  const tablCode = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    null,
    8,
    9,
    <AntDesign name="delete" size={22} color="black" />,
  ];

  return (
    <AuthContext.Provider
      value={{
        imageUser,
        email,
        nom,
        prenom,
        numero,
        code,
        date,
        lieu,
        montant,
        tabl,
        tablVerif,
        tablCode,
        validate,
        contactSelect,
        imageCNI_RectoBD,
        imageCNI_VersoBD,
        scanned,
        otp,
        selectedType,
        balance,
        setOtp,
        setContactSelect,
        setMontant,
        setCode,
        setNumero,
        setImageUser,
        setEmail,
        setNom,
        setPrenom,
        setDate,
        setLieu,
        setValidate,
        setBalance,
        setImageCNI_RectoBD,
        setImageCNI_VersoBD,
        setScanned,
        setSelectedType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
