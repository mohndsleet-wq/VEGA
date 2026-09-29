/* =========================================================
   VEGA FUEL SYSTEMS
   EQUIPMENT DATABASE
========================================================= */

const equipmentData = [

  {
    id: "FT-001",
    category: "Fuel Tanks",
    subcategory: "Storage Tanks",

    name: "Diesel Fuel Storage Tank",
    model: "Custom Fabricated",
    manufacturer: "AL-AYASH",

    description:
      "Diesel fuel storage tank designed for generator fuel systems and complete with required connections and accessories.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/fuel-tank.jpg",

    specifications: {
      "Tank Type": "Aboveground",
      "Fuel": "Diesel",
      "Construction": "Steel",
      "Capacity": "Project Specific",
      "Configuration": "Single / Double Wall",
      "Installation": "Indoor / Outdoor"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/fuel-tank-datasheet.pdf"
      }
    ],

    featured: true
  },


  {
    id: "LM-001",
    category: "Level Monitoring",
    subcategory: "Tank Monitoring",

    name: "OCIO Tank Level Indicator",
    model: "OCIO",
    manufacturer: "PIUSI",

    description:
      "Electronic tank level monitoring system for continuous fuel level measurement and indication.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/ocio.jpg",

    specifications: {
      "Application": "Fuel Tank Level Monitoring",
      "Display": "Digital",
      "Measurement": "Continuous",
      "Installation": "Tank Monitoring System"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/ocio-datasheet.pdf"
      }
    ],

    featured: true
  },


  {
    id: "LV-001",
    category: "Level Monitoring",
    subcategory: "Level Switches",

    name: "Magnetic Float Switch",
    model: "Float Level Switch",
    manufacturer: "AL-AYASH",

    description:
      "Magnetic float switch used for high and low fuel level monitoring and alarm signals.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/float-switch.jpg",

    specifications: {
      "Application": "Diesel Fuel",
      "Function": "High / Low Level Detection",
      "Output": "Level Alarm Signal",
      "Installation": "Fuel Tank"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/float-switch-datasheet.pdf"
      }
    ],

    featured: false
  },


  {
    id: "VA-001",
    category: "Valves",
    subcategory: "Tank Accessories",

    name: "Pressure Vacuum Vent",
    model: "623V",
    manufacturer: "OPW",

    description:
      "Pressure vacuum vent for fuel storage tank venting applications.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/opw-623v.jpg",

    specifications: {
      "Application": "Fuel Storage Tank",
      "Function": "Pressure / Vacuum Venting",
      "Installation": "Tank Vent Connection"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/opw-623v.pdf"
      }
    ],

    featured: true
  },


  {
    id: "PI-001",
    category: "Piping",
    subcategory: "Fuel Piping",

    name: "Black Steel Seamless Pipe",
    model: "SCH 40",
    manufacturer: "NKK",

    description:
      "Schedule 40 seamless black steel pipe for diesel fuel supply, return and transfer piping systems.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/sch40-pipe.jpg",

    specifications: {
      "Material": "Black Steel",
      "Type": "Seamless",
      "Schedule": "SCH 40",
      "Application": "Diesel Fuel Piping"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/sch40-pipe.pdf"
      }
    ],

    featured: false
  },


  {
    id: "CP-001",
    category: "Control Panels",
    subcategory: "Fuel System Control",

    name: "Fuel System Control Panel",
    model: "Custom Control Panel",
    manufacturer: "ALFANAR / ABB",

    description:
      "Fuel system control panel for monitoring and controlling fuel transfer equipment, alarms and level signals.",

    price: "Contact Sales",
    currency: "SAR",

    image: "assets/products/control-panel.jpg",

    specifications: {
      "Enclosure": "IP56",
      "Components": "ABB",
      "Application": "Fuel Transfer System",
      "Configuration": "Project Specific"
    },

    documents: [
      {
        name: "Technical Datasheet",
        type: "PDF",
        url: "assets/documents/control-panel.pdf"
      }
    ],

    featured: true
  }

];
