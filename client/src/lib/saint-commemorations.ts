// Saint commemorations data from Kidasan Belat.txt and Yaadannoo Qulqullotaa.txt
// This file contains the saint commemorations for each day of the Ethiopian month

export interface SaintCommemoration {
  day: number;
  month: number;
  names: {
    am: string[];  // Amharic
    om: string[];  // Afaan Oromo
  };
}

// Mapping of all saint commemorations by day of the month (1-30)
export const saintCommemorations: SaintCommemoration[] = [
  {
    day: 1,
    month: 0, // All months
    names: {
      am: ["ልደታ", "ራጉኤል", "ኤልያስ", "በርተሎሚዎስ"],
      om: ["Dhaloota (Maariyaam)", "Raagu'eel", "Eeliyaas", "Bartalomewos"]
    }
  },
  {
    day: 2,
    month: 0,
    names: {
      am: ["ታዲዮስ ሐዋርያ", "እዮብ ጻዲቅ", "አቤል"],
      om: ["Duuka Bu'aa Taadewos", "Iyyoob Qulqulluu", "Abeel"]
    }
  },
  {
    day: 3,
    month: 0,
    names: {
      am: ["በዓታ", "ነአኩቶለአብ", "ፋኑኤል", "ዜና ማርቆስ", "አባ ሊባኖስ"],
      om: ["Ba'ataa (Mana Qulqullummaa Seenamuu Maariyaam)", "Na'aakkuto La'ab", "Faanu'eel", "Zeenaa Maarqoos", "Abbaa Libaanos"]
    }
  },
  {
    day: 4,
    month: 0,
    names: {
      am: ["ዩሐንስ ወልደ ነጎድጏድ", "እንድርያስ", "አብርሐ ወአጽብሐ", "አባ መልከጻዲቅ"],
      om: ["Yohaannis Ilma Bakakkaa", "Indiriyaas", "Abrahaa fi Atsbahaa", "Abbaa Malkatsedeeq"]
    }
  },
  {
    day: 5,
    month: 0,
    names: {
      am: ["ገብረመንፈስቅዱስ", "ዼጥሮስወዻውሎስ"],
      om: ["Gabra Manfas Quddus", "Pheexiroos fi Phaawuloos"]
    }
  },
  {
    day: 6,
    month: 0,
    names: {
      am: ["ኢየሱስ", "ቁስቓም", "ማርያም መግደላዊት", "አርሴማ"],
      om: ["Iyyasuus", "Qusqaam", "Maariyaam Magdalaawwit", "Arseemaa"]
    }
  },
  {
    day: 7,
    month: 0,
    names: {
      am: ["ሥላሴ", "ኢያቂም", "አትናቲዎስ", "ዲዮስቆሮስ"],
      om: ["Sillaasee", "Iyaaqeem", "Atinaatewoos", "Diyoosqoros"]
    }
  },
  {
    day: 8,
    month: 0,
    names: {
      am: ["አርባእቱ እንስሳ", "አባኪሮስ"],
      om: ["Arba'attuu Uumamtoota Lubbuu Qaban", "Abbaa Kiiroos"]
    }
  },
  {
    day: 9,
    month: 0,
    names: {
      am: ["እስትንፋሰ ክርስቶስ", "ቶማስ ዘመርአስ"],
      om: ["Istinfaasa Kiristoos (Hafuurfannaa Kiristoos)", "Toomaas Isa Mar'aas"]
    }
  },
  {
    day: 10,
    month: 0,
    names: {
      am: ["መስቀለ እየሱስ", "ፂዲንያ ማርያም", "ተቀፀልጽጌ"],
      om: ["Fannoo Iyyasuus", "Tsidiinyaa Maariyaam", "Taqatsal Tsigee"]
    }
  },
  {
    day: 11,
    month: 0,
    names: {
      am: ["ቅዱስያሬድ", "ቅድስት ሃና", "አቡነ ሐራ ድንግል", "ፋሲለደስ"],
      om: ["Qulqulluu Yaareed", "Qulqulleettii Haannaa", "Abuna Hara Dingil", "Faasiiladas"]
    }
  },
  {
    day: 12,
    month: 0,
    names: {
      am: ["ቅዱስ ሚካኤል", "ማቲዎስ", "ቅዱስ ላሊበላ", "ዩሐንስ አፈወርቅ", "አባ ሳሙኤል ዘዋልድባ", "ድሚጥሮስ"],
      om: ["Qulqulluu Mikaa'el", "Maatewoos", "Qulqulluu Laalibalaa", "Yohaannis Afawarq (Afaan Warqee)", "Abbaa Saamu'eel Isa Waaldibbaa", "Dimitriyoos"]
    }
  },
  {
    day: 13,
    month: 0,
    names: {
      am: ["እግዚአብሔር አብ", "ሩፋኤል", "አቡነ ዘርአብሩክ"],
      om: ["Waaqayyoo Abbaa", "Rufaa'el", "Abuna Zar'aabruk"]
    }
  },
  {
    day: 14,
    month: 0,
    names: {
      am: ["አቡነ አረጋዊ", "ገ/ክርስቶስ"],
      om: ["Abuna Araggaawwii", "Gabra Kiristoos"]
    }
  },
  {
    day: 15,
    month: 0,
    names: {
      am: ["ሕፃን ቂርቆስ ሰማኸት", "ናትናኤል ሐዋርያ", "ኤፍራም ሶርያዊ"],
      om: ["Mucaa Qiiroqos Wareegamaa", "Naatinaa'el Ergamaa", "Efreem Isa Sooriyaa"]
    }
  },
  {
    day: 16,
    month: 0,
    names: {
      am: ["ኪዳነ ምህረት", "ቅድስት እየሉጣ"],
      om: ["Kidaana Mihirat (Waadaa Araaraa)", "Qulqulleettii Iyyaluuxaa"]
    }
  },
  {
    day: 17,
    month: 0,
    names: {
      am: ["ቅዱስ እስጢፋኖስ", "አባ ገሪማ"],
      om: ["Qulqulluu Isxifaanoos", "Abbaa Garimaa"]
    }
  },
  {
    day: 18,
    month: 0,
    names: {
      am: ["ፊሊዾስ ሐዋርያ", "ሰበር አፅሙ ለጊዮርጊስ"],
      om: ["Filiphoos Ergamaa", "Lafee Giyoorgis Cabsuu"]
    }
  },
  {
    day: 19,
    month: 0,
    names: {
      am: ["ቅዱስ ገብርኤል"],
      om: ["Qulqulluu Gabri'eel"]
    }
  },
  {
    day: 20,
    month: 0,
    names: {
      am: ["ሐንፀተ ቤተ/ክ", "ዩሐንስ ሐፂር", "ኤልሳ ነብይ"],
      om: ["Ijaarsa Mana Kiristaanaa", "Yohaannis Gabaabaa (Hatsiir)", "Eelsaa Raajii"]
    }
  },
  {
    day: 21,
    month: 0,
    names: {
      am: ["እመቤታችን ቅድስት ድንግል ማርያም", "ዕዝራ ሱቱኤል"],
      om: ["Giiftii Keenya Qulqulleettii Durboo Maariyaam", "Izraa Sutu'eel"]
    }
  },
  {
    day: 22,
    month: 0,
    names: {
      am: ["ቅዱስ ዑራኤል", "ሉቃስ", "ደቀስዮስ"],
      om: ["Qulqulluu Uraa'el", "Luqaas", "Daqsiyoos"]
    }
  },
  {
    day: 23,
    month: 0,
    names: {
      am: ["ጊዮርጊስ ሊቀ ሰማእት"],
      om: ["Giyoorgis Hangafa Wareegamtootaa"]
    }
  },
  {
    day: 24,
    month: 0,
    names: {
      am: ["ተክለሐይማኖት", "ክርስቶስ ሰምራ", "ሙሴጸሊም", "አባጎርጎርዮስ", "24ቱ ካህናተ ሰማይ"],
      om: ["Takla Haaymaanoot", "Kiristoos Samraa", "Musee Gurraacha", "Abbaa Gorgooriyoos", "Luboota Samii Digdamii Afuran (24)"]
    }
  },
  {
    day: 25,
    month: 0,
    names: {
      am: ["ቅዱስ መርቆርዮስ"],
      om: ["Qulqulluu Marqorewoos"]
    }
  },
  {
    day: 26,
    month: 0,
    names: {
      am: ["ዮሴፍ የእመቤታችን ጠባቂ", "አቡነ ሐብተማርያም"],
      om: ["Yooseef Eegduu Giiftii Keenyaa", "Abuna Habta Maariyaam"]
    }
  },
  {
    day: 27,
    month: 0,
    names: {
      am: ["መድኃኒዓለም", "አባ መባጽዮን"],
      om: ["Fayyisaa Addunyaa", "Abbaa Mabaa Tsiyoon"]
    }
  },
  {
    day: 28,
    month: 0,
    names: {
      am: ["አማኑኤል", "አብርሃም", "ይሳሐቅ", "ያዕቆብ"],
      om: ["Amaanu'eel", "Abrahaam", "Yisihaaq", "Yaa'iqoob"]
    }
  },
  {
    day: 29,
    month: 0,
    names: {
      am: ["በዓለ ወልድ", "ተፈፃሜ ሰማዕት ዼጥሮስ"],
      om: ["Ayyaana Ilmaa", "Wareegamuu Pheexiroos"]
    }
  },
  {
    day: 30,
    month: 0,
    names: {
      am: ["መጥምቀ መለኮት ቅዱስ ዩሐንስ", "ማርቆስ ወንጌላዊ"],
      om: ["Yohaannis Cuuphaa", "Maarqoos Wangeelaawwii"]
    }
  }
];

/**
 * Get saint commemorations for a specific day of the month
 */
export const getSaintCommemorationsByDay = (
  day: number, 
  month?: number
): SaintCommemoration | undefined => {
  return saintCommemorations.find(comm => 
    comm.day === day && (comm.month === 0 || comm.month === month)
  );
};
