/* =========================================================
   VEGA ENGINEERING SOLUTIONS
   FUEL SYSTEMS TECHNICAL LIBRARY
   PRODUCT DATABASE
========================================================= */


/*
   IMPORTANT

   To add a new product later:
   Copy one complete product object,
   change its information,
   image and PDF path.

   The website will automatically read it.
*/


const equipmentData = [

    /* =====================================================
       01 — DIESEL FUEL STORAGE TANK
    ===================================================== */

    {
        id: "FS-001",

        name: "Diesel Fuel Storage Tank",

        shortName: "Fuel Storage Tank",

        category: "Fuel Tanks",

        manufacturer: "AL-AYASH",

        model: "Custom Fabricated",

        price: "Contact Sales",

        image: "assets/products/fuel-storage-tank.jpg",

        description:
            "Double-skinned aboveground diesel fuel storage tank for generator fuel system applications, complete with required connections and tank accessories.",

        keywords: [
            "tank",
            "fuel tank",
            "diesel tank",
            "storage tank",
            "double wall",
            "double skin",
            "al ayash"
        ],

        features: [
            {
                label: "APPLICATION",
                value: "Diesel Fuel Storage"
            },

            {
                label: "INSTALLATION",
                value: "Aboveground"
            },

            {
                label: "CONSTRUCTION",
                value: "Double-Skinned"
            },

            {
                label: "CAPACITY",
                value: "Project Specific"
            },

            {
                label: "MANUFACTURER",
                value: "AL-AYASH"
            },

            {
                label: "SYSTEM",
                value: "Generator Fuel System"
            }
        ],

        specifications: {
            "Equipment Type": "Diesel Fuel Storage Tank",
            "Tank Construction": "Double-Skinned",
            "Installation": "Aboveground",
            "Fuel Type": "Diesel",
            "Capacity": "Project Specific",
            "Manufacturer": "AL-AYASH",
            "Application": "Generator Fuel System"
        },

        documents: [
            {
                name: "Fuel Storage Tank Technical Datasheet",
                type: "PDF",
                file: "assets/documents/fuel-storage-tank.pdf"
            }
        ]
    },


    /* =====================================================
       02 — PIUSI OCIO
    ===================================================== */

    {
        id: "FS-002",

        name: "Tank Level Indicator",

        shortName: "OCIO Level Indicator",

        category: "Level Monitoring",

        manufacturer: "PIUSI",

        model: "OCIO",

        price: "Contact Sales",

        image: "assets/products/piusi-ocio.jpg",

        description:
            "Electronic tank level monitoring device used for continuous indication and monitoring of diesel fuel level in storage and day tank applications.",

        keywords: [
            "ocio",
            "piusi",
            "level",
            "level indicator",
            "tank monitoring",
            "fuel level"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Level Monitoring"
            },

            {
                label: "APPLICATION",
                value: "Fuel Tanks"
            },

            {
                label: "MANUFACTURER",
                value: "PIUSI"
            },

            {
                label: "MODEL",
                value: "OCIO"
            },

            {
                label: "MONITORING",
                value: "Continuous"
            },

            {
                label: "SYSTEM",
                value: "Diesel Fuel"
            }
        ],

        specifications: {
            "Product": "Tank Level Indicator",
            "Manufacturer": "PIUSI",
            "Model": "OCIO",
            "Application": "Diesel Fuel Tank",
            "Function": "Continuous Level Monitoring",
            "Installation": "Tank Monitoring System"
        },

        documents: [
            {
                name: "PIUSI OCIO Technical Datasheet",
                type: "PDF",
                file: "assets/documents/piusi-ocio.pdf"
            }
        ]
    },


    /* =====================================================
       03 — MAGNETIC FLOAT SWITCH
    ===================================================== */

    {
        id: "FS-003",

        name: "Magnetic Float Switch",

        shortName: "Float Switch",

        category: "Level Monitoring",

        manufacturer: "VEGA APPROVED",

        model: "Project Specific",

        price: "Contact Sales",

        image: "assets/products/float-switch.jpg",

        description:
            "Magnetic float switch for fuel tank high and low level signaling, alarm interface and fuel system control applications.",

        keywords: [
            "float",
            "float switch",
            "level switch",
            "high level",
            "low level",
            "alarm"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Level Switching"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "SIGNALS",
                value: "High / Low Level"
            },

            {
                label: "APPLICATION",
                value: "Fuel Tank"
            },

            {
                label: "CONTROL",
                value: "Alarm / Panel"
            },

            {
                label: "SELECTION",
                value: "Project Specific"
            }
        ],

        specifications: {
            "Product": "Magnetic Float Switch",
            "Service": "Diesel Fuel",
            "Application": "Fuel Tank",
            "Function": "High / Low Level Signal",
            "Output": "Control / Alarm Signal",
            "Selection": "Project Specific"
        },

        documents: [
            {
                name: "Magnetic Float Switch Datasheet",
                type: "PDF",
                file: "assets/documents/float-switch.pdf"
            }
        ]
    },


    /* =====================================================
       04 — OVERFILL PREVENTION VALVE
    ===================================================== */

    {
        id: "FS-004",

        name: "Overfill Prevention Valve",

        shortName: "Overfill Valve",

        category: "Valves",

        manufacturer: "OPW",

        model: "Project Specific",

        price: "Contact Sales",

        image: "assets/products/overfill-valve.jpg",

        description:
            "Automatic overfill prevention valve used during fuel tank filling to reduce the risk of tank overfilling and fuel spillage.",

        keywords: [
            "overfill",
            "overfill valve",
            "opw",
            "tank filling",
            "fuel filling",
            "prevention valve"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Overfill Prevention"
            },

            {
                label: "APPLICATION",
                value: "Fuel Tank Filling"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "MANUFACTURER",
                value: "OPW"
            },

            {
                label: "OPERATION",
                value: "Automatic"
            },

            {
                label: "SYSTEM",
                value: "Fuel Filling"
            }
        ],

        specifications: {
            "Product": "Overfill Prevention Valve",
            "Manufacturer": "OPW",
            "Application": "Fuel Tank Filling",
            "Service": "Diesel Fuel",
            "Function": "Overfill Prevention",
            "Operation": "Automatic"
        },

        documents: [
            {
                name: "Overfill Prevention Valve Datasheet",
                type: "PDF",
                file: "assets/documents/overfill-valve.pdf"
            }
        ]
    },


    /* =====================================================
       05 — VENT CAP / FLAME ARRESTOR
    ===================================================== */

    {
        id: "FS-005",

        name: "Pressure Vacuum Vent with Flame Arrestor",

        shortName: "Vent & Flame Arrestor",

        category: "Valves",

        manufacturer: "OPW",

        model: "623V",

        price: "Contact Sales",

        image: "assets/products/opw-623v.jpg",

        description:
            "Pressure vacuum vent with flame arrestor for diesel fuel storage tank venting applications.",

        keywords: [
            "623v",
            "opw 623v",
            "vent",
            "vent cap",
            "flame arrestor",
            "pressure vacuum",
            "tank vent"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Tank Venting"
            },

            {
                label: "TYPE",
                value: "Pressure / Vacuum"
            },

            {
                label: "SAFETY",
                value: "Flame Arrestor"
            },

            {
                label: "MANUFACTURER",
                value: "OPW"
            },

            {
                label: "MODEL",
                value: "623V"
            },

            {
                label: "APPLICATION",
                value: "Fuel Storage Tank"
            }
        ],

        specifications: {
            "Product": "Pressure Vacuum Vent",
            "Manufacturer": "OPW",
            "Model": "623V",
            "Application": "Fuel Storage Tank",
            "Function": "Pressure / Vacuum Venting",
            "Safety Feature": "Flame Arrestor"
        },

        documents: [
            {
                name: "OPW 623V Technical Datasheet",
                type: "PDF",
                file: "assets/documents/opw-623v.pdf"
            }
        ]
    },


    /* =====================================================
       06 — EMERGENCY SHUT-OFF VALVE
    ===================================================== */

    {
        id: "FS-006",

        name: "Emergency Shut-Off Valve",

        shortName: "Emergency Valve",

        category: "Valves",

        manufacturer: "VEGA APPROVED",

        model: "Project Specific",

        price: "Contact Sales",

        image: "assets/products/emergency-shutoff-valve.jpg",

        description:
            "Emergency shut-off valve for isolation of diesel fuel lines during emergency or maintenance conditions.",

        keywords: [
            "emergency",
            "shut off",
            "shutoff",
            "emergency valve",
            "isolation",
            "fuel valve"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Emergency Isolation"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "APPLICATION",
                value: "Fuel Piping"
            },

            {
                label: "OPERATION",
                value: "Shut-Off"
            },

            {
                label: "SIZE",
                value: "Project Specific"
            },

            {
                label: "SYSTEM",
                value: "Fuel Distribution"
            }
        ],

        specifications: {
            "Product": "Emergency Shut-Off Valve",
            "Service": "Diesel Fuel",
            "Application": "Fuel Piping System",
            "Function": "Emergency Isolation",
            "Size": "Project Specific",
            "Selection": "As per Project Requirement"
        },

        documents: [
            {
                name: "Emergency Shut-Off Valve Datasheet",
                type: "PDF",
                file: "assets/documents/emergency-shutoff-valve.pdf"
            }
        ]
    },


    /* =====================================================
       07 — Y STRAINER
    ===================================================== */

    {
        id: "FS-007",

        name: "Y-Strainer",

        shortName: "Y-Strainer",

        category: "Piping",

        manufacturer: "GALA",

        model: "Project Specific",

        price: "Contact Sales",

        image: "assets/products/y-strainer.jpg",

        description:
            "Y-type strainer installed in diesel fuel piping to protect downstream valves and equipment from solid contaminants.",

        keywords: [
            "y strainer",
            "strainer",
            "filter",
            "gala",
            "fuel piping"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Filtration"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "TYPE",
                value: "Y-Strainer"
            },

            {
                label: "MANUFACTURER",
                value: "GALA"
            },

            {
                label: "SIZE",
                value: "Project Specific"
            },

            {
                label: "APPLICATION",
                value: "Fuel Piping"
            }
        ],

        specifications: {
            "Product": "Y-Strainer",
            "Manufacturer": "GALA",
            "Service": "Diesel Fuel",
            "Application": "Fuel Piping",
            "Function": "Solid Particle Filtration",
            "Size": "Project Specific"
        },

        documents: [
            {
                name: "Y-Strainer Technical Datasheet",
                type: "PDF",
                file: "assets/documents/y-strainer.pdf"
            }
        ]
    },


    /* =====================================================
       08 — BLACK STEEL PIPE
    ===================================================== */

    {
        id: "FS-008",

        name: "Black Steel Seamless Pipe",

        shortName: "Fuel Pipe",

        category: "Piping",

        manufacturer: "NKK",

        model: "SCH 40",

        price: "Contact Sales",

        image: "assets/products/black-steel-pipe.jpg",

        description:
            "Schedule 40 black steel seamless piping for diesel fuel distribution between storage tanks, day tanks and generator equipment.",

        keywords: [
            "pipe",
            "black steel",
            "seamless",
            "sch40",
            "schedule 40",
            "nkk",
            "fuel pipe"
        ],

        features: [
            {
                label: "MATERIAL",
                value: "Black Steel"
            },

            {
                label: "CONSTRUCTION",
                value: "Seamless"
            },

            {
                label: "SCHEDULE",
                value: "SCH 40"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "MANUFACTURER",
                value: "NKK"
            },

            {
                label: "APPLICATION",
                value: "Fuel Distribution"
            }
        ],

        specifications: {
            "Product": "Black Steel Seamless Pipe",
            "Manufacturer": "NKK",
            "Material": "Black Steel",
            "Construction": "Seamless",
            "Schedule": "SCH 40",
            "Service": "Diesel Fuel"
        },

        documents: [
            {
                name: "Black Steel Seamless Pipe Datasheet",
                type: "PDF",
                file: "assets/documents/black-steel-pipe.pdf"
            }
        ]
    },


    /* =====================================================
       09 — FLEXIBLE CONNECTOR
    ===================================================== */

    {
        id: "FS-009",

        name: "Flexible Fuel Connector",

        shortName: "Flexible Connector",

        category: "Piping",

        manufacturer: "VEGA APPROVED",

        model: "Project Specific",

        price: "Contact Sales",

        image: "assets/products/flexible-connector.jpg",

        description:
            "Flexible connection used between fuel piping and vibrating equipment to accommodate movement and reduce transmission of vibration.",

        keywords: [
            "flexible",
            "connector",
            "flexible connector",
            "hose",
            "vibration",
            "fuel connection"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Flexible Connection"
            },

            {
                label: "SERVICE",
                value: "Diesel Fuel"
            },

            {
                label: "APPLICATION",
                value: "Vibrating Equipment"
            },

            {
                label: "PURPOSE",
                value: "Vibration Isolation"
            },

            {
                label: "SIZE",
                value: "Project Specific"
            },

            {
                label: "SYSTEM",
                value: "Fuel Piping"
            }
        ],

        specifications: {
            "Product": "Flexible Fuel Connector",
            "Service": "Diesel Fuel",
            "Application": "Fuel Piping",
            "Function": "Vibration Isolation",
            "Connection Size": "Project Specific",
            "Selection": "As per Equipment Connection"
        },

        documents: [
            {
                name: "Flexible Connector Datasheet",
                type: "PDF",
                file: "assets/documents/flexible-connector.pdf"
            }
        ]
    },


    /* =====================================================
       10 — FUEL SYSTEM CONTROL PANEL
    ===================================================== */

    {
        id: "FS-010",

        name: "Fuel System Control Panel",

        shortName: "Control Panel",

        category: "Control Panels",

        manufacturer: "ALFANAR / ABB",

        model: "IP56",

        price: "Contact Sales",

        image: "assets/products/control-panel.jpg",

        description:
            "Fuel system control and monitoring panel for transfer pump control, level monitoring, alarm indication and fuel system automation.",

        keywords: [
            "control panel",
            "fuel panel",
            "alfanar",
            "abb",
            "ip56",
            "pump control",
            "fuel monitoring"
        ],

        features: [
            {
                label: "FUNCTION",
                value: "Control & Monitoring"
            },

            {
                label: "ENCLOSURE",
                value: "IP56"
            },

            {
                label: "COMPONENTS",
                value: "ABB"
            },

            {
                label: "PANEL",
                value: "ALFANAR"
            },

            {
                label: "APPLICATION",
                value: "Fuel Transfer"
            },

            {
                label: "MONITORING",
                value: "Levels & Alarms"
            }
        ],

        specifications: {
            "Product": "Fuel System Control Panel",
            "Panel": "ALFANAR",
            "Components": "ABB",
            "Enclosure Protection": "IP56",
            "Application": "Fuel Transfer System",
            "Functions": "Pump Control / Monitoring / Alarms"
        },

        documents: [
            {
                name: "Fuel System Control Panel Datasheet",
                type: "PDF",
                file: "assets/documents/control-panel.pdf"
            }
        ]
    }

];


/* =========================================================
   MAKE DATABASE AVAILABLE TO APP.JS
========================================================= */

window.equipmentData = equipmentData;
