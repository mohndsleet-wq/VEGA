/* =========================================================
   VEGA ENGINEERING SOLUTIONS
   FUEL SYSTEM TECHNICAL LIBRARY
   Equipment Database
   ========================================================= */

const EQUIPMENT_DATA = [

  // ========================================================
  // 01 — FUEL LEVEL MONITORING
  // ========================================================
  {
    id: "FS-001",

    name: "OCIO Tank Level Indicator",
    shortName: "OCIO",
    brand: "PIUSI",
    model: "OCIO",

    category: "Fuel Level Monitoring",
    system: "Monitoring & Instrumentation",

    description:
      "Electronic tank level monitoring system for continuous measurement and monitoring of diesel fuel level.",

    price: 0,
    currency: "SAR",

    origin: "Italy",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Tank Level Indicator",
      "Application": "Diesel Fuel System",
      "Manufacturer": "PIUSI",
      "Model": "OCIO",
      "Installation": "Tank Mounted / Remote Monitoring"
    },

    features: [
      "Continuous fuel level monitoring",
      "Digital level indication",
      "Suitable for diesel storage tanks",
      "Easy installation and operation"
    ],

    tags: [
      "OCIO",
      "PIUSI",
      "level indicator",
      "tank monitoring",
      "fuel level"
    ]
  },


  // ========================================================
  // 02 — FLOAT SWITCH
  // ========================================================
  {
    id: "FS-002",

    name: "Magnetic Float Level Switch",
    shortName: "Float Switch",
    brand: "Generic",
    model: "Magnetic Float Switch",

    category: "Level Control",
    system: "Monitoring & Instrumentation",

    description:
      "Magnetic float level switch used for high and low fuel level detection and alarm signals.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Level Switch",
      "Application": "Diesel Fuel Tank",
      "Function": "High / Low Level Detection",
      "Signal": "Dry Contact"
    },

    features: [
      "High level detection",
      "Low level detection",
      "Alarm signal interface",
      "Suitable for fuel tanks"
    ],

    tags: [
      "float switch",
      "level switch",
      "fuel alarm",
      "tank"
    ]
  },


  // ========================================================
  // 03 — OVERFILL PROTECTION
  // ========================================================
  {
    id: "FS-003",

    name: "Overfill Prevention Valve",
    shortName: "Overfill Valve",
    brand: "OPW",
    model: "Overfill Prevention Valve",

    category: "Tank Protection",
    system: "Fuel Filling System",

    description:
      "Automatic overfill prevention valve designed to reduce the risk of fuel tank overfilling during filling operation.",

    price: 0,
    currency: "SAR",

    origin: "USA",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Overfill Prevention Valve",
      "Application": "Diesel Storage Tank",
      "Function": "Automatic Overfill Protection"
    },

    features: [
      "Automatic filling shut-off",
      "Tank overfill protection",
      "Mechanical operation",
      "Fuel system safety"
    ],

    tags: [
      "OPW",
      "overfill",
      "overfill valve",
      "tank protection"
    ]
  },


  // ========================================================
  // 04 — FUEL FILLING
  // ========================================================
  {
    id: "FS-004",

    name: "Stainless Steel Fuel Filling Box",
    shortName: "Fuel Filling Box",
    brand: "VEGA",
    model: "Fuel Filling Cabinet",

    category: "Fuel Filling",
    system: "Fuel Filling System",

    description:
      "Stainless steel fuel filling cabinet providing a dedicated and protected filling connection for the diesel fuel system.",

    price: 0,
    currency: "SAR",

    origin: "Saudi Arabia",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Fuel Filling Cabinet",
      "Material": "Stainless Steel",
      "Application": "Diesel Fuel Filling",
      "Installation": "Outdoor / Indoor"
    },

    features: [
      "Stainless steel construction",
      "Protected filling connection",
      "Suitable for diesel fuel systems",
      "Industrial installation"
    ],

    tags: [
      "fuel filling",
      "filling box",
      "stainless steel",
      "fuel cabinet"
    ]
  },


  // ========================================================
  // 05 — TANK VENTING
  // ========================================================
  {
    id: "FS-005",

    name: "Pressure Vacuum Vent with Flame Arrestor",
    shortName: "Vent & Flame Arrestor",
    brand: "OPW",
    model: "623V",

    category: "Tank Venting",
    system: "Fuel Storage System",

    description:
      "Pressure vacuum vent with flame arrestor used for safe ventilation of diesel fuel storage tanks.",

    price: 0,
    currency: "SAR",

    origin: "USA",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Pressure Vacuum Vent",
      "Model": "623V",
      "Application": "Fuel Storage Tank",
      "Protection": "Flame Arrestor"
    },

    features: [
      "Tank pressure relief",
      "Vacuum protection",
      "Integrated flame arrestor",
      "Fuel tank ventilation"
    ],

    tags: [
      "OPW",
      "623V",
      "vent",
      "flame arrestor",
      "tank vent"
    ]
  },


  // ========================================================
  // 06 — VALVES
  // ========================================================
  {
    id: "FS-006",

    name: "Fuel System Valves",
    shortName: "Valves",
    brand: "GALA",
    model: "Industrial Valve Series",

    category: "Valves",
    system: "Fuel Piping System",

    description:
      "Industrial valves for isolation, flow control and protection within diesel fuel piping systems.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Fuel System Valves",
      "Application": "Diesel Fuel Piping",
      "Types": "Ball / Gate / Check",
      "Installation": "Fuel Piping Network"
    },

    features: [
      "Fuel flow isolation",
      "Backflow prevention",
      "Industrial construction",
      "Suitable for diesel piping"
    ],

    tags: [
      "valve",
      "ball valve",
      "gate valve",
      "check valve",
      "GALA"
    ]
  },


  // ========================================================
  // 07 — STRAINER
  // ========================================================
  {
    id: "FS-007",

    name: "Y-Strainer",
    shortName: "Y-Strainer",
    brand: "GALA",
    model: "Y-Strainer",

    category: "Filtration",
    system: "Fuel Piping System",

    description:
      "Pipeline Y-strainer used to remove solid particles and protect downstream fuel system equipment.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Y-Strainer",
      "Application": "Diesel Fuel Piping",
      "Function": "Mechanical Filtration"
    },

    features: [
      "Pipeline filtration",
      "Equipment protection",
      "Removable strainer element",
      "Suitable for diesel fuel"
    ],

    tags: [
      "strainer",
      "Y strainer",
      "filter",
      "fuel piping"
    ]
  },


  // ========================================================
  // 08 — FLEXIBLE CONNECTION
  // ========================================================
  {
    id: "FS-008",

    name: "Flexible Fuel Connector",
    shortName: "Flexible Connector",
    brand: "Industrial",
    model: "Flexible Fuel Hose",

    category: "Flexible Connections",
    system: "Fuel Piping System",

    description:
      "Flexible fuel connection used between vibrating equipment and rigid fuel piping to reduce transmission of vibration.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Flexible Connector",
      "Application": "Diesel Fuel System",
      "Function": "Vibration Isolation",
      "Connection": "Fuel Piping"
    },

    features: [
      "Vibration isolation",
      "Flexible installation",
      "Generator fuel connection",
      "Protects rigid piping"
    ],

    tags: [
      "flexible connector",
      "fuel hose",
      "generator",
      "vibration"
    ]
  },


  // ========================================================
  // 09 — FUEL PIPE
  // ========================================================
  {
    id: "FS-009",

    name: "Black Steel Seamless Pipe SCH 40",
    shortName: "Fuel Pipe SCH 40",
    brand: "NKK",
    model: "SCH 40",

    category: "Pipes & Fittings",
    system: "Fuel Piping System",

    description:
      "Black steel seamless Schedule 40 pipe for diesel fuel distribution and transfer piping systems.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Seamless Steel Pipe",
      "Material": "Black Steel",
      "Schedule": "SCH 40",
      "Application": "Diesel Fuel Piping"
    },

    features: [
      "Seamless steel construction",
      "Schedule 40",
      "Industrial fuel piping",
      "Multiple sizes available"
    ],

    tags: [
      "pipe",
      "SCH40",
      "black steel",
      "NKK",
      "fuel piping"
    ]
  },


  // ========================================================
  // 10 — PIPE FITTINGS
  // ========================================================
  {
    id: "FS-010",

    name: "Black Steel Threaded Fittings",
    shortName: "Steel Fittings",
    brand: "Hitachi",
    model: "Threaded Fittings",

    category: "Pipes & Fittings",
    system: "Fuel Piping System",

    description:
      "Black steel threaded fittings for connection and routing of diesel fuel piping systems.",

    price: 0,
    currency: "SAR",

    origin: "N/A",
    status: "Available",

    image: "",
    images: [],

    datasheet: "",

    specifications: {
      "Equipment Type": "Pipe Fittings",
      "Material": "Black Steel",
      "Connection": "Threaded",
      "Application": "Diesel Fuel Piping"
    },

    features: [
      "Industrial threaded connection",
      "Multiple fitting configurations",
      "Suitable for fuel piping",
      "Black steel construction"
    ],

    tags: [
      "Hitachi",
      "fittings",
      "threaded fittings",
      "black steel",
      "fuel pipe"
    ]
  }

];
