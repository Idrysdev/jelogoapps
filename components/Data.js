import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Data_Factures = [
  {
    nom: "Marchands",
    text: require("../assets/icons/factureItems/marchand.png"),
    backgroundColor: "#FFFFFF",
    textColor: "Black",
    option: [
      {
        Etape: "Identifiant du Marchand",
      },
    ],
  },

  {
    nom: "Transport",
    text: require("../assets/icons/factureItems/transport.png"),
    backgroundColor: "#FFFFFF",
    textColor: "Black",
    option: [
      {
        nom: "YANGO",
        text: require("../assets/icons/factureItems/transport/yango.png"),
        backgroundColor: "#FF0000",
        textColor: "white",
        option: [
          {
            Etape: "Scanner QR Code YANGO",
            valideScan: true,
            null: null,
          },
        ],
      },
      {
        nom: "Heetch",
        text: require("../assets/icons/factureItems/transport/heetch.png"),
        backgroundColor: "#FF2773",
        textColor: "white",
        option: [
          {
            Etape: "Scanner QR Code Heetch",
            valideScan: true,
            null: null,
          },
        ],
      },
      {
        nom: "Uber",
        text: require("../assets/icons/factureItems/transport/uber.png"),
        backgroundColor: "#010202",
        textColor: "white",
        option: [
          {
            Etape: "Scanner QR Code Uber",
            valideScan: true,
            null: null,
          },
        ],
      },
    ],
  },

  {
    nom: "Factures",
    text: require("../assets/icons/factureItems/facture.png"),
    backgroundColor: "#FFFFFF",
    textColor: "Black",
    option: [
      {
        nom: "Canal +",
        text: require("../assets/icons/factureItems/factures/canal.png"),
        backgroundColor: "black",
        textColor: "white",
        option: [
          {
            Label: "Reconduire mon abonnement actuel",
            option: [
              {
                Etape: "Numéro de réabonnement CANAL +",
              },
            ],
          },
          {
            Label: "Changer d’offre",
            option: [
              {
                Etape: "Numéro de réabonnement CANAL +",
              },
            ],
          },
          {
            Label: "Consulter / Regulariser mon solde impayé",
            option: [
              {
                Etape: "Numéro de réabonnement CANAL +",
              },
            ],
          },
        ],
      },
      {
        nom: "CIE",
        text: require("../assets/icons/factureItems/factures/cie.png"),
        backgroundColor: "#F1892A",
        textColor: "white",
        option: [
          {
            Etape: "Numéro identifiant CIE",
          },
        ],
      },
      {
        nom: "SODECI",
        text: require("../assets/icons/factureItems/factures/sodeci.png"),
        backgroundColor: "#00AC67",
        textColor: "white",
        option: [
          {
            Etape: "Numéro identifiant SODECI",
          },
        ],
      },
      {
        nom: "Pont HKB",
        text: require("../assets/icons/factureItems/factures/hkb.png"),
        backgroundColor: "#00AC67",
        textColor: "white",
        option: [
          {
            Etape: "Numéro de badge HKB",
          },
        ],
      },
      {
        nom: "StarTimes",
        text: require("../assets/icons/factureItems/factures/startimes.png"),
        backgroundColor: "#F1892A",
        textColor: "white",
        option: [
          {
            Etape: "Numéro d’abonné StarTimes",
          },
        ],
      },
    ],
  },
];

const Data_Transaction = [
  {
    nom: "Orange Money",
    text: require("../assets/icons/Mobileservices.png"),
    style: {
      color: "#FF7900",
      backgroundColor: "black",
    },
    method: 'om'
  },
  {
    nom: "Moov Money",
    text: require("../assets/icons/Group12.png"),
    style: {
      color: "white",
      backgroundColor: "#0066B5",
    },
    method: 'flooz'
  },
  {
    nom: "MTN Money",
    text: require("../assets/icons/Group13.png"),
    style: {
      color: "black",
      backgroundColor: "#FFC403",
    },
    method: 'momo'
  },
  {
    nom: "Wave",
    text: require("../assets/icons/Group14.png"),
    style: {
      color: "white",
      backgroundColor: "#1DC8FF",
    },
    method: 'wave'
  },
  {
    nom: "Banques",
    text: require("../assets/icons/banque.png"),
    Option_Bnq: [
      {
        nom: "Vers un compte VISA",
        text: require("../assets/icons/factureItems/banque/visa.png"),
        backgroundColor: "white",
        textColor: "black",
        option: [
          {
            Etape: "Nom du compte",
            Placeholder: "Name Account",
          },
          {
            Etape: "IBAN",
            Placeholder: "CI008 01111 111xxx91058 27",
          },
          {
            Etape: "Montant",
            Placeholder: "15 000 XOF",
          },
        ],
      },
      {
        nom: "Vers un compte JELOGO",
        text: require("../assets/icons/factureItems/banque/JeLogo.png"),
        backgroundColor: "#0066B5",
        textColor: "white",
        option: [
          {
            Etape: "Nom du compte",
            Placeholder: "Name Account",
          },
          {
            Etape: "IBAN",
            Placeholder: "CI008 01111 111xxx91058 27",
          },
          {
            Etape: "Montant",
            Placeholder: "15 000 XOF",
          },
        ],
      },
    ],
  },
  {
    nom: "JELOGO",
    text: require("../assets/icons/Jelogo.png"),
    style: {
      color: "white",
      backgroundColor: "black",
    },
    method: 'jelogo'
  },
];
const Data_Transaction_Recharge = [
  {
    nom: "Orange Money",
    text: require("../assets/icons/Mobileservices.png"),
    style: {
      color: "#FF7900",
      backgroundColor: "black",
    },
    method: 'om'
  },
  {
    nom: "Moov Money",
    text: require("../assets/icons/Group12.png"),
    style: {
      color: "white",
      backgroundColor: "#0066B5",
    },
    method: 'flooz'
  },
  {
    nom: "MTN Money",
    text: require("../assets/icons/Group13.png"),
    style: {
      color: "black",
      backgroundColor: "#FFC403",
    },
    method: 'momo'
  },
  {
    nom: "Wave",
    text: require("../assets/icons/Group14.png"),
    style: {
      color: "white",
      backgroundColor: "#1DC8FF",
    },
    method: 'wave'
  },

  {
    nom: "Banques",
    text: require("../assets/icons/banque.png"),
    Option_Bnq: [
      {
        nom: "depuis un compte VISA",
        text: require("../assets/icons/factureItems/banque/visa.png"),
        backgroundColor: "white",
        option: [
          {
            Etape: "Nom du compte",
            Placeholder: "Name Account",
          },
          {
            Etape: "IBAN",
            Placeholder: "CI008 01111 111xxx91058 27",
          },
          {
            Etape: "Montant",
            Placeholder: "15 000 XOF",
          },
        ],
      },
      {
        nom: "depuis un compte JELOGO",
        text: require("../assets/icons/factureItems/banque/JeLogo.png"),
        backgroundColor: "#0066B5",
        option: [
          {
            Etape: "Nom du compte",
            Placeholder: "Name Account",
          },
          {
            Etape: "IBAN",
            Placeholder: "CI008 01111 111xxx91058 27",
          },
          {
            Etape: "Montant",
            Placeholder: "15 000 XOF",
          },
        ],
      },
    ],
    method: 'bank'
  },
];

const Data_Pass = [
  {
    pass: true,
    nom: "Orange",
    backgroundColor: "black",
    textColor: "#FF7900",
    text: require("../assets/icons/orange.png"),
    option: [
      {
        Label: "Pass Mix",
        option: [
          {
            Label: "Pass 1 à 3 jours",
            option: [
              {
                Label: "Pass Mix 300F (25min+50Mo)",
              },
              {
                Label: "Minutes - 200F(15 min TR)",
              },
            ],
          },
          {
            Label: "Pass Semaine",
            option: [
              {
                Label: "Pass Mix 1000F (70min+600Mo)",
              },
              {
                Label: "Pass Mix 500F (50min+250Mo)",
              },
            ],
          },
          {
            Label: "Pass Mois",
            option: [
              {
                Label: "Pass Mix 200000F (120min+20Go)",
              },
              {
                Label: "Pass Mix 10000F (500min+10Go)",
              },
              {
                Label: "Pass Mix 5000F (400min+4Go)",
              },
              {
                Label: "Pass Mix 3000F (250min+2.5Go)",
              },
            ],
          },
        ],
      },
      {
        Label: "Pass Internet",
        option: [
          {
            Label: "Pass reseaux sociaux",
            option: [
              {
                Label: "Social 300F - 450Mo",
              },
              {
                Label: "TikTok 300F - 600Mo",
              },
            ],
          },
          {
            Label: "Pass 1 à  3 jours",
            option: [
              {
                Label: "2Jours 200F - 220Mo",
              },
              {
                Label: "3Jours 300F - 340Mo",
              },
              {
                Label: "3Jours 500F - 650Mo",
              },
            ],
          },
          {
            Label: "Pass Semaine",
            option: [
              {
                Label: "Semaine 1000F - 1224Mo",
              },
            ],
          },
          {
            Label: "Pass Mois",
            option: [
              {
                Label: "Mois 2500F - 3.5Go",
              },
              {
                Label: "Mois 5000F - 7.2Go",
              },
              {
                Label: "Mois 10000F - 15Go",
              },
              {
                Label: "Mois 20000F - 36Go",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    pass: true,
    nom: "Moov Africa",
    backgroundColor: "#0066B5",
    textColor: "white",
    text: require("../assets/icons/moov.png"),
    option: [
      {
        Label: "Forfait Internet",
        option: [
          {
            Label: "Internet illimité",
            option: [
              { Label: "1H illim 300F" },
              { Label: "2H illim 500F" },
              { Label: "6H illim 1300F" },
            ],
          },
          {
            Label: "Forfaits Journaliers",
            option: [
              { Label: "2J 150Mo 150F" },
              { Label: "2J 220Mo 200F" },
              { Label: "3J 340Mo 300F" },
              { Label: "3J 750Mo 500F" },
            ],
          },
          {
            Label: "Forfaits Hebdomadaires",
            option: [
              { Label: "7J 1Go 750F" },
              { Label: "10J 1300Mo 1000F" },
              { Label: "21J 2000Mo 1500F" },
            ],
          },
          {
            Label: "Forfaits Mensuels",
            option: [
              { Label: "30J 3Go 2000F" },
              { Label: "30J 7.2Go 4900F" },
              { Label: "30J 22Go 9900F" },
              { Label: "30J 35Go 14900F" },
              { Label: "30J 50Go 19900F" },
            ],
          },
          {
            Label: "Forfaits Maxi Data",
            option: [
              { Label: "30J 150Go 24000F" },
              { Label: "30J 300Go 29000F" },
              { Label: "30J 400Go 39000F" },
            ],
          },
          {
            Label: "Forfaits Spéciaux",
            option: [
              { Label: "Nuit Soft 1Go+30min TR 200F" },
              { Label: "Sociiaux Jour 500Mo 200F" },
              { Label: "Forfait TikTok 1Go 300F" },
            ],
          },
        ],
      },
      {
        Label: "Forfaits Izy Heures +",
        option: [
          { Label: "10MinTR + 15Mo +30SMS 150F" },
          { Label: "15MinTR + 25Mo + 50SMS 200F" },
          { Label: "25MinTR + 100Mo + 100SMS 300F" },
          { Label: "40MinTR + 250Mo + 250SMS 500F" },
          { Label: "80MinTR + 500Mo + 500SMS 1000F" },
          { Label: "120MinTR + 500Mo + 500SMS 1500F" },
          { Label: "200MinTR + 2Go + 500SMS 2500F" },
          { Label: "400MinTR + 5Go + 500SMS 5000F" },
          { Label: "830MinTR + 8Go + 500SMS 10000F" },
          { Label: "1660MinTR + 20Go + 1000SMS 20000F" },
        ],
      },
      {
        Label: "Forfaits MoovFolie",
        option: [
          {
            Label: "MoovFolie Appels",
            option: [
              { Label: "1J 12Min TR 150F" },
              { Label: "2J 17Min TR 200F" },
              { Label: "3J 25Min TR 300F" },
              { Label: "4J 42Min TR 500F" },
              { Label: "15J 85Min TR 1000F" },
              { Label: "21J 130Min TR 1500F" },
              { Label: "30J 220Min TR 2500F" },
              { Label: "30J 445Min TR 5000F" },
            ],
          },
          {
            Label: "MoovFolie Internet",
            option: [{ Label: "3J 400Mo 200F" }, { Label: "7J 1Go 500F" }],
          },
          {
            Label: "MoovFolie Appels + Internet",
            option: [
              { Label: "23H-05H 30Min TR 200F" },
              { Label: "7J 1H TR + 1Go 700F" },
            ],
          },
        ],
      },
    ],
  },
  {
    pass: true,
    nom: "MTN Money",
    backgroundColor: "#FFC403",
    textColor: "black",
    text: require("../assets/icons/Group13.png"),
    option: [
      {
        Label: "Pack free plus",
        option: [
          { Label: " 150F 1J (10 mins+15 SMS+45Mo)" },
          { Label: "200F 1J (15 mins+25 SMS+75Mo)" },
          { Label: "300F 1J (25 mins+30 SMS+150Mo)" },
          { Label: "500F 7J (50 mins+100 SMS+750Mo)" },
          { Label: "600F 7J (55 mins+100 SMS+900Mo)" },
          { Label: "1000F 10J (80 mins+100 SMS+1,8Go)" },
          { Label: "1200F 10J (100 mins+120 SMS+1,8Go)" },
          { Label: "2000F 15J (165 mins+150 SMS+3Go)" },
          { Label: "2500F 30J (205 mins+300 SMS+6Go)" },
          { Label: "5000F 30J (415 mins+500 SMS+10Go)" },
          { Label: "10000F 30J (830 mins+500 SMS+20Go)" },
          {
            Label: "Autres Packs",
            option: [
              { Label: "5200F 30J(430 mins+500 SMS+8Go)" },
              { Label: "20000F 30J (1665 mins+1000 SMS+40Go)" },
              {
                Label:
                  "175F-Pack free + YDGamme-1J (10 mins+15 SMS+15Mo/J & YDGame)",
              },
              {
                Label:
                  "250F-Pack free + Gagne ta voiture-2J (15 mins+25 SMS+25Mo/2J)",
              },
              {
                Label:
                  "400F-Pack free + Numero Bonheur-1J (25 mins+30 SMS+150Mo/J)",
              },
              {
                Label:
                  "550F-Pack free + Gagne ta voiture-7J (50 mins+100 SMS+750Mo/7J)",
              },
            ],
          },
        ],
      },
      {
        Label: "Pack Free",
        option: [
          {
            Label: "Mini",
            option: [
              { Label: "Mini 150F 2950 Pts" },
              { Label: "Mini 200F 4340 Pts" },
              { Label: "Mini 300F 7180 Pts" },
              { Label: "Mini 500F 13070 Pts" },
              { Label: "Mini 1000F 27000 Pts" },
            ],
          },
          {
            Label: "Maxi",
            option: [
              { Label: "Maxi 600F 11690 Pts" },
              { Label: "Maxi 1200F 26160 Pts" },
              { Label: "Maxi 1800F 43180 Pts" },
            ],
          },
          {
            Label: "Mois",
            option: [
              { Label: "Mois 1950F 38030 Pts" },
              { Label: "Mois 3950F 85720 Pts" },
              { Label: "Mois 5200F 124300 Pts" },
              { Label: "Mois 9800F 261040 Pts" },
            ],
          },
        ],
      },
      {
        Label: "Pack internet",
        option: [
          { Label: "150F 150Mo+100% 1J" },
          { Label: "200F 220Mo+100% 2J" },
          { Label: "300F 340Mo+100% 3J" },
          { Label: "400F 450Mo+100% 3J" },
          { Label: "500F 750Mo+100% 3J" },
          { Label: "1000F 1.2Go+100% 7J" },
          { Label: "1800F 2Go+100% 30J" },
          { Label: "2500F 3,5Go+100% 30J" },
          { Label: "5000F 7,2Go+100% 30J" },
          { Label: "10000F 15Go+100% 30J" },
        ],
      },
    ],
  },
];

const Data_Social_Media = [
  {
    nom: "Twitter",
    img: require("../assets/icons/Twitter.png"),
  },
  {
    nom: "Facebook",
    img: require("../assets/icons/Facebook.png"),
  },
  {
    nom: "Whatsapp",
    img: require("../assets/icons/WhatsApp.png"),
  },
  {
    nom: "Telegram",
    img: require("../assets/icons/Telegram.png"),
  },
  {
    nom: "Instagram",
    img: require("../assets/icons/Instagram.png"),
  },
  {
    nom: "Copy",
    img: require("../assets/icons/copy.png"),
  },
  {
    nom: "docs",
    img: require("../assets/icons/docs.png"),
  },
];

const Data_Iconographie = [
  {
    label: "Transfert d’argent",
    txt: "Envoyer de l'argent",
    img: require("../assets/icons/iconographie/depot.png"),
    width: 58,
    height: 46,
    name: 'cashout'
  },
  {
    label: "Envoi par scan",
    txt: "",
    img: require("../assets/icons/iconographie/cash.png"),
    width: 52,
    height: 45,
    name: 'cashout'
  },
  {
    label: "Recharger mon solde",
    txt: "Recharger votre solde depuis votre operateur",
    img: require("../assets/icons/iconographie/money.png"),
    width: 50,
    height: 50,
    name: 'cashin'
  },
  {
    label: "Transfert et achat de Pass",
    txt: "Transfert d'unités et achat de Pass",
    img: require("../assets/icons/iconographie/pass.png"),
    width: 45,
    height: 67,
    name: 'airtime'
  },
  {
    label: "Paiements",
    txt: "Paiements des factures et services",
    img: require("../assets/icons/iconographie/facture.png"),
    width: 46,
    height: 42,
    name: 'payment'
  },
  {
    label: "Historique",
    img: require("../assets/icons/iconographie/historique.png"),
    width: 48,
    height: 47,
    name: 'history'
  },
];

const Data_Date = [
  { nom: "Janvier", id: 0 },
  { nom: "Fevrier", id: 1 },
  { nom: "Mars", id: 2 },
  { nom: "Avril", id: 3 },
  { nom: "Mai", id: 4 },
  { nom: "Juin", id: 5 },
  { nom: "Juillet", id: 6 },
  { nom: "Aout", id: 7 },
  { nom: "Septembre", id: 8 },
  { nom: "Octobre", id: 9 },
  { nom: "Novembre", id: 10 },
  { nom: "Decembre", id: 11 },
];
const Data_Operation = [
  { nom: "Tout", id: "all" },
  { nom: "Dépense", id: "cashout" },
  { nom: "Recharge", id: "cashin" },
];

const Data_Image = [
  {
    img: require("../assets/icons/Mobileservices.png"),
  },
  {
    img: require("../assets/icons/Group14.png"),
  },
  {
    img: require("../assets/icons/Group13.png"),
  },
  {
    img: require("../assets/icons/Group12.png"),
  },

  {
    img: require("../assets/icons/visa.png"),
  },
];

const Data_Null = [
  {
    null: "null",
  },
];

const Data_Parametre = [
  {
    Label: "Modes de paiement",
    option: [
      {
        Label: "Annuler un transfert d'argent",
        icon: "money-bill",
      },
    ],
  },
  {
    Label: "Aide et contact",
    option: [
      {
        Label: "Partager l'application",
        icon: "share-alt",
      },
      {
        Label: "Où nous trouver",
        icon: "location-arrow",
      },
      {
        Label: "Assistance & Réclamations",
        icon: "headphones",
        link: "mailto:assistance@jelogo.net"
      },
      {
        Label: "À propos",
        icon: "info-circle",
        option: [
          {
            Label: "Outil de diagnostic",
            icon: "",
          },
          {
            Label: "Informations légales",
            icon: "",
          },
          {
            Label: "Conditions générales d'utilisation",
            icon: "",
            link: "https://jelogo.net/condition.pdf"
          },
          {
            Label: "Logiciels tiers",
            icon: "",
          },
          {
            Label: "Badge de confiance",
            icon: "",
          },
        ],
      },
    ],
  },
];

const Banque_Setting = [
  {
    Icon: <Ionicons name="lock-closed" size={24} color="black" />,
    Label: "Verrouilller la carte",
    Desicrpt: "Bloquez de façon temporaire",
  },
  {
    Icon: (
      <MaterialCommunityIcons
        name="credit-card-check"
        size={24}
        color="black"
      />
    ),
    Label: "Remplacez la carte",
    Desicrpt: "Remplacez votre carte JELOGO",
  },
  {
    Icon: <Feather name="codesandbox" size={24} color="black" />,
    Label: "Voir mes commandes",
    Desicrpt: "Suivez le statut de vos commandes",
  },
  {
    Icon: (
      <MaterialCommunityIcons
        name="form-textbox-password"
        size={24}
        color="black"
      />
    ),
    Label: "Changer de code guichet",
    Desicrpt: "Réinitialisez votre code de retrait",
  },
];
const Compte_Setting = [
  {
    Icon: <Feather name="user" size={24} color="black" />,
    Label: "Informations personnelles",
    Lien: "informations",
  },
  {
    Icon: (
      <MaterialCommunityIcons
        name="form-textbox-password"
        size={24}
        color="black"
      />
    ),
    Label: "Modifier mon code secret",
    Lien: "lockScreen",
    action: "edit"
  },
  {
    Icon: <Feather name="file-text" size={24} color="black" />,
    Label: "Documents",
  },
  {
    Icon: <Feather name="aperture" size={24} color="black" />,
    Label: "Plan tarifaire",
  },
];

const keyboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default {
  Data_Factures,
  Data_Transaction,
  Data_Transaction_Recharge,
  Data_Pass,
  Data_Social_Media,
  Data_Iconographie,
  Data_Date,
  Data_Operation,
  Data_Image,
  Data_Parametre,
  Banque_Setting,
  Compte_Setting,
  Data_Null,
  keyboard,
};
