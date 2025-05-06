import { Prayer, Church, Tradition, Teaching } from "./types";

export const teachings: Teaching[] = [
  {
    id: 1,
    title: "Foundations of Faith",
    slug: "foundations-of-faith",
    shortDescription: "The core beliefs and theological foundations of the Ethiopian Orthodox Tewahedo Church, including its unique Christology.",
    content: "The Ethiopian Orthodox Tewahedo Church is one of the oldest Christian churches in the world, dating back to the 4th century. The term 'Tewahedo' means 'unified' and refers to the belief in the one perfectly unified nature of Christ, a position known as miaphysitism. This is in contrast to the dyophysite position (two natures of Christ) held by most Western churches. The church maintains a strong connection to Old Testament practices while fully embracing the New Testament...",
    imageUrl: "https://pixabay.com/get/gb770db21c79e358f653cc92b288f483ec79b5c0914fa0741bf2d9d35681ff358ed157de6b81a611180b4db9b4660272ecd51ee395ee88d0664451913a6d72260_1280.jpg"
  },
  {
    id: 2,
    title: "Sacred Scriptures",
    slug: "sacred-scriptures",
    shortDescription: "The Ethiopian Biblical canon, which includes unique books like Enoch, Jubilees, and additional texts not found in other traditions.",
    content: "The Ethiopian Orthodox Tewahedo Church has the largest and most diverse biblical canon of any Christian church. In addition to the 66 books accepted by most Protestant denominations, the Ethiopian canon includes books such as Enoch, Jubilees, 1-3 Meqabyan (not the same as the Maccabees), and others. The Book of Enoch, in particular, is only fully preserved in Ge'ez (ancient Ethiopian language) and provides important background for New Testament concepts...",
    imageUrl: "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 3,
    title: "Saints & Icons",
    slug: "saints-and-icons",
    shortDescription: "The veneration of saints and the rich tradition of Ethiopian iconography, with its distinctive style and spiritual symbolism.",
    content: "The veneration of saints plays a vital role in Ethiopian Orthodox spirituality. Ethiopian Orthodox iconography is characterized by its vibrant colors, stylized figures with large expressive eyes, and the use of traditional patterns. Each saint is typically depicted with specific attributes and symbols related to their life and ministry. Among the most venerated saints are St. Mary (given special honor), St. George, and St. Michael the Archangel...",
    imageUrl: "https://pixabay.com/get/ga2c602fbd47a7d8f728cf65f88770582c25aeac777cc457a5836d89959cdf3ac4ecec4412dc82f0d6bf6009be8246ad6a7e7e05832a5984a6d19270bd27220a0_1280.jpg"
  },
  {
    id: 4,
    title: "Divine Liturgy",
    slug: "divine-liturgy",
    shortDescription: "The structure and meaning of the Ethiopian Orthodox Liturgy (Qeddase), one of the most ancient forms of Christian worship.",
    content: "The Ethiopian Orthodox Divine Liturgy (Qeddase) is one of the most ancient forms of Christian worship, believed to be derived from the Liturgy of St. Mark. The service is conducted in Ge'ez, the ancient liturgical language, and can last several hours. The liturgy is rich in symbolism, with specific movements, gestures, and instruments like the prayer stick (mequamia), sistrum, and drums. The church follows different anaphoras (eucharistic prayers) attributed to various apostles and church fathers...",
    imageUrl: "https://pixabay.com/get/g0711c1d7d08c8af4834d6f1e01a0a82ed9f48c3ea0cdfd7e1e2fb3c29cb31abb0f3d195cff546b3cc8bc8c7e4abc99a8cb31a3a5d55fdf06dd1d67aaee92c05a_1280.jpg"
  },
  {
    id: 5,
    title: "Monastic Tradition",
    slug: "monastic-tradition",
    shortDescription: "The rich history and practices of Ethiopian monasticism, which has preserved the faith through centuries.",
    content: "Monasticism has been central to Ethiopian Orthodox Christianity since its earliest days. The monastic tradition was established in the 5th century by the Nine Saints, monks who came from various parts of the Byzantine Empire. Ethiopian monastics follow strict ascetic practices including extended fasting periods, regular prayer vigils, and often live in remote locations. Some of the most famous monasteries include Debre Damo (accessible only by rope), the cliff-top monasteries of Gheralta, and the lake monasteries of Lake Tana...",
    imageUrl: "https://pixabay.com/get/g18b0d6e6bcb6deba18ebf32c4eff3d17fb7c8adec73c1ad1a90fb45f03c6a71a0c8e881d0b88cf5c2bcef5cce5d2d74d0b5ec60dc3d52c1d5e55a0f81e9b0e35_1280.jpg"
  },
  {
    id: 6,
    title: "Church History",
    slug: "church-history",
    shortDescription: "The fascinating journey of the Ethiopian Orthodox Church from its founding to the present day.",
    content: "The history of Christianity in Ethiopia begins in the 1st century with the conversion of the Ethiopian eunuch by Philip as recorded in Acts 8:26-40. However, the official conversion of Ethiopia is traditionally attributed to Frumentius, who converted King Ezana of Axum in the 4th century. Throughout its history, the Ethiopian Orthodox Church developed independently from European Christianity while maintaining connections with Coptic and other Oriental Orthodox churches. The church survived the expansion of Islam in the region and later resisted Catholic and Protestant missionary efforts, maintaining its unique traditions...",
    imageUrl: "https://pixabay.com/get/g2bf8a9de89e84fec5e0d87d17de62d8c5ab9bbd452a3da16bf5afc9c0fc47b6f2a16ea1c14d53e8cd41acfbfc52ecd318a4ef1a28ffdc94f339d5df15a5e2eec_1280.jpg"
  }
];

export type PrayerCategory = "Morning Prayer" | "Evening Prayer" | "Liturgical Hymn" | "Fasting Prayer";

export const prayers: Prayer[] = [
  {
    id: 1,
    title: "Prayer of Absolution",
    originalTitle: "ጸሎተ ፍትሐት",
    slug: "prayer-of-absolution",
    description: "The Prayer of Absolution, recited at the beginning of many services including the Divine Liturgy.",
    content: "O Lord our God, good and merciful, who by the holy mouth of Your only-begotten Son, our Lord, God and Savior Jesus Christ, have spoken concerning Your holy Apostles, saying, 'Whatsoever you shall bind on earth shall be bound in heaven, and whatsoever you shall loose on earth shall be loosed in heaven.' We ask You now, O good and Lover of mankind, for Your servants my fathers, my brothers and my weakness, who are bowing their heads before Your holy glory: grant us Your mercy and loose each one of us from the chain of our sins...",
    category: "Liturgical Hymn",
    imageUrl: "https://images.unsplash.com/photo-1520182205149-1e5e4e7329b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    id: 2,
    title: "Holy, Holy, Holy",
    originalTitle: "ቅዱስ ቅዱስ ቅዱስ",
    slug: "holy-holy-holy",
    description: "The Trisagion (Holy, Holy, Holy), a powerful hymn that invokes the Holy Trinity during worship.",
    content: "Holy, Holy, Holy, Lord God of Hosts, Heaven and earth are full of the majesty of Your glory. Hosanna in the highest. Blessed is He who comes in the name of the Lord. Hosanna in the highest. Holy, Holy, Holy are You truly, O Lord our God. Save us all, O good and merciful Lord. Holy God, Holy Mighty, Holy Immortal, who was born of the Virgin, have mercy upon us...",
    category: "Liturgical Hymn",
    imageUrl: "https://pixabay.com/get/g48ad4a97405e4ff498cdf998a1d04b149ee0c3d65053413113cb33571890b65afef417bcdde03f1ec0667acc7ab99abc3e6e8ee0c51af551be19859e87578396_1280.jpg"
  },
  {
    id: 3,
    title: "Praise of Mary",
    originalTitle: "ውዳሴ ማርያም",
    slug: "praise-of-mary",
    description: "The Praise of Mary, a collection of hymns offered to the Virgin Mary, sung during evening services.",
    content: "Rejoice, O our Lady, Mother of God. Rejoice, O You who are the rejoicing of the angels. Rejoice, O pure one, preached by the prophets. Rejoice, O You who have found grace, the Lord is with You. Rejoice, O You who have received the joy of the world from the angel. Rejoice, O You who have given birth to the Creator. Rejoice, O You who are worthy to be called the Mother of Christ, the King of all and our God...",
    category: "Evening Prayer",
    imageUrl: "https://pixabay.com/get/g0c0d8afe71cf72d4999ee8c48c3eff6104482a4b89ffcb4c7a56adf77c7fdb982b06a28d89c471af7d8343d9bf3f02015b2215fedd8596d8da30235b1cb7a6c9_1280.jpg"
  },
  {
    id: 4,
    title: "Prayer Before Meals",
    originalTitle: "ጸሎት ቅድመ ብልዐት",
    slug: "prayer-before-meals",
    description: "A prayer of thanksgiving and blessing said before partaking of food.",
    content: "O Lord our God, of whose abundance we are about to partake, bless this food and drink set before us. For You are the fountain of all blessing, and to You we ascribe glory, to the Father, and to the Son, and to the Holy Spirit, now and forever and unto the ages of all ages. Amen.",
    category: "Morning Prayer",
    imageUrl: "https://pixabay.com/get/g9b65efe19ca09fc28b95e66e4f0b4f5f1c3b2629f9abcd9fa6df3b56c9bd05c10b9c7f0bf3613ac90e8a4e2a9b06c5ffb2cb5a3e45cd39e87fc3df0c5d3ce04a_1280.jpg"
  },
  {
    id: 5,
    title: "Lenten Prayer of St. Ephrem",
    originalTitle: "ጸሎት ለጾም ዘቅዱስ አፍሬም",
    slug: "lenten-prayer-st-ephrem",
    description: "A profound prayer of repentance recited during the Great Fast (Lent).",
    content: "O Lord and Master of my life, give me not the spirit of sloth, idle curiosity, lust for power and idle talk. But grant unto me, Thy servant, a spirit of chastity, humility, patience and love. O Lord and King, grant me to see mine own faults and not to judge my brother. For blessed art Thou unto the ages of ages. Amen.",
    category: "Fasting Prayer",
    imageUrl: "https://pixabay.com/get/g31acd32f9cdce10fde7ce7ddd41ac0acf5af26ce7c0fcb3e13fe70e76e7f97aee57b3dc0e69d909af8f8db8dd3d9b9bf1d5bf48b6b90f2eea1fc98a661bac8dd_1280.jpg"
  },
  {
    id: 6,
    title: "Morning Prayer of Thanksgiving",
    originalTitle: "ጸሎተ አመስጋኒት ንግህ",
    slug: "morning-prayer-thanksgiving",
    description: "A prayer offered at the beginning of the day, giving thanks for God's protection through the night.",
    content: "We give You thanks, Holy Lord, Almighty Father, Eternal God, who has safely brought us to the beginning of this day. Defend us today by Your mighty power, that we may not fall into sin, but that all our words may so proceed and all our thoughts and works may be directed to do that which is just in Your sight. Through our Lord Jesus Christ, Your Son, who lives and reigns with You in the unity of the Holy Spirit, God, forever and ever. Amen.",
    category: "Morning Prayer",
    imageUrl: "https://pixabay.com/get/g1aebf42c22c98339a7f1f93be82c3e2bcc8ac71fe0a2df8d0bcbab6a2f7d85cd6ace46f68ad24e83b79b5a4f2b8d49e0e29bf9cc3c8889dc69ec06e9ee15f76f_1280.jpg"
  }
];

export const churches: Church[] = [
  {
    id: 1,
    name: "Rock-Hewn Churches of Lalibela",
    slug: "lalibela",
    description: "The 11 medieval monolithic churches carved from rock, a UNESCO World Heritage site and a center of pilgrimage for Ethiopian Orthodox Christians.",
    longDescription: "The 11 rock-hewn churches of Lalibela were created in the 12th-13th centuries and are carved directly into the rock of the mountains. They were commissioned by King Lalibela, who sought to create a 'New Jerusalem' after Muslim conquests halted Christian pilgrimages to the Holy Land. The most famous is the Church of St. George (Bete Giyorgis), carved in the shape of a cross. These churches are not only religious sites but also remarkable feats of engineering and architecture, all connected by a network of tunnels and trenches.",
    location: "Lalibela, Amhara Region, Ethiopia",
    imageUrl: "https://pixabay.com/get/g595c935fafb908babcfd8d47791cb8af63bb0011042105c3cf12e5b87e578f9cce8c56b8bf46c713e70ffdd8145d2bfec018430b50c660e7bc4221fbcefe05e6_1280.jpg",
    significantFeatures: ["Monolithic construction", "Underground tunnels", "Cross-shaped St. George Church", "Active pilgrimage site", "UNESCO World Heritage"]
  },
  {
    id: 2,
    name: "Holy Trinity Cathedral",
    slug: "holy-trinity-cathedral",
    description: "The highest-ranking Ethiopian Orthodox cathedral in Addis Ababa, known for its distinctive architecture and as the final resting place of Emperor Haile Selassie.",
    longDescription: "Holy Trinity Cathedral (known locally as Kidist Selassie) was built to commemorate Ethiopia's liberation from Italian occupation and was completed in 1942. It features a unique blend of Ethiopian and European architectural styles with large stained glass windows depicting biblical scenes and Ethiopian history. The cathedral serves as the final resting place of Emperor Haile Selassie and his wife Empress Menen Asfaw, as well as other notable figures in Ethiopian history. As the seat of the Archbishop of the Ethiopian Orthodox Church, it's a major center for religious ceremonies and celebrations.",
    location: "Addis Ababa, Ethiopia",
    imageUrl: "https://pixabay.com/get/g8cfc96689d6a07145ace5f10dafd9cfde68e39498ab06195053235276622f5094dc7f73f3a938bb1a62d5539d3e99d8b6992d3e74f0527e50f98e681d65520e2_1280.jpg",
    significantFeatures: ["Final resting place of Emperor Haile Selassie", "Stained glass artwork", "Fusion of Ethiopian and European styles", "National importance", "Active cathedral"]
  },
  {
    id: 3,
    name: "Debre Damo Monastery",
    slug: "debre-damo",
    description: "An ancient monastery located on a flat-topped mountain, accessible only by climbing a leather rope, housing some of Ethiopia's oldest religious manuscripts.",
    longDescription: "Debre Damo is one of Ethiopia's most important monasteries, dating back to the 6th century. It sits atop a flat-topped mountain (amba) and is famously accessible only by climbing a 15-meter leather rope, which women and female animals are forbidden to ascend. The monastery contains the oldest existing church building in Ethiopia, constructed in the Aksumite architectural style with layers of wood and stone. It houses a significant collection of ancient manuscripts and is still home to a community of monks who maintain traditional practices. The isolation of the monastery has helped preserve many ancient religious texts and traditions.",
    location: "Tigray Region, Ethiopia",
    imageUrl: "https://pixabay.com/get/ge50ce01ac7c0e7b7e57a49b12f6dac78ea9c1dc1657ceca28dd9cae87fbfc85ded6c6fb29d0df58d24af1fb93dee3dad558ed9c7461d979d5f50b5cd9fe7b2c8_1280.jpg",
    significantFeatures: ["Accessible only by rope", "6th century origins", "Aksumite architecture", "Ancient manuscripts", "Monastic community"]
  },
  {
    id: 4,
    name: "Monastery of Debre Libanos",
    slug: "debre-libanos",
    description: "An important monastery founded in the 13th century by Saint Tekle Haymanot, one of Ethiopia's most revered saints.",
    longDescription: "Debre Libanos was founded in the 13th century by Saint Tekle Haymanot, who is said to have prayed for 29 years standing on one leg until the other withered and fell off. The current church was built by Emperor Haile Selassie in 1961, replacing a structure from the 1950s. The monastery is a major pilgrimage site, particularly during the feast of Saint Tekle Haymanot. Nearby is a sacred spring believed to have healing properties and a cave where Saint Tekle Haymanot is said to have lived as a hermit. The site was also the location of a massacre in 1937 during the Italian occupation, when hundreds of monks and other Ethiopians were killed.",
    location: "Oromia Region, Ethiopia",
    imageUrl: "https://pixabay.com/get/gbad2f3faea10d9a12e7df5feb0d8a9c9cf34c80f0f9ba2e55fb76cbbf10a2ac5e1d0ab452d6e1c02eb0a7c06a631f0b38ca9b0f35d3c7602c3c0e70feb4cac5f_1280.jpg",
    significantFeatures: ["Associated with St. Tekle Haymanot", "Sacred spring", "Beautiful landscape", "Site of historical massacre", "Active pilgrimage center"]
  }
];

export const traditions: Tradition[] = [
  {
    id: 1,
    name: "Meskel Festival",
    description: "An annual religious holiday commemorating the finding of the True Cross. Celebrated with the burning of a large bonfire called Damera and accompanied by singing and dancing.",
    history: "Meskel has been celebrated in Ethiopia for over 1,600 years. According to tradition, Queen Helena (mother of Emperor Constantine the Great) discovered the True Cross in the 4th century after following the smoke from a burning bonfire. The festival symbolizes the revelation of the True Cross and is celebrated on September 27 (or September 28 in leap years).",
    significance: "Meskel marks the finding of the True Cross on which Jesus Christ was crucified. The bonfire symbolizes the smoke that guided Queen Helena. The festival also coincides with the end of the rainy season in Ethiopia and the blooming of Meskel daisies (yellow flowers).",
    icon: "🔥"
  },
  {
    id: 2,
    name: "Timket (Epiphany)",
    description: "A celebration of the baptism of Jesus Christ in the Jordan River. Tabots (replicas of the Ark of the Covenant) are carried in procession to a body of water where the blessing takes place.",
    history: "Timket has been celebrated in Ethiopia since the adoption of Christianity as the state religion in the 4th century. It is the Ethiopian celebration of Epiphany, commemorating the baptism of Jesus in the Jordan River.",
    significance: "Timket is one of the most colorful Ethiopian festivals. The most important part is the removal of the church tabots from each church and their procession to a water source. The tabots stay overnight, then the blessing of the water and symbolic baptismal renewal occurs the next morning. The tabots then return to their churches in colorful procession.",
    icon: "💧"
  },
  {
    id: 3,
    name: "Fasting Traditions",
    description: "Ethiopian Orthodox followers observe over 250 fasting days per year, including the 55-day Lent fast (Hudade), abstaining from animal products and eating after 3pm.",
    history: "Fasting has been a central practice in Ethiopian Orthodox Christianity from its inception. The practice is rooted in biblical precedents and the early Christian church, but the Ethiopian Orthodox Church has developed particularly extensive fasting periods.",
    significance: "Fasting is considered essential for spiritual growth and purification. During fasts, believers abstain from animal products (becoming effectively vegan) and often don't eat or drink until a certain time of day. Major fasting periods include the 55-day Great Lent (Hudade), the Fast of the Prophets, the Assumption Fast, and Wednesday and Friday weekly fasts.",
    icon: "🍽️"
  },
  {
    id: 4,
    name: "Liturgical Music",
    description: "Ethiopian Orthodox liturgical music features unique chanting styles accompanied by traditional instruments such as the sistrum (senasel), drums (kebero), and prayer sticks (mequamia).",
    history: "The musical tradition of the Ethiopian Orthodox Church dates back to Saint Yared in the 6th century, who is credited with creating the sacred music notation system called mekwamia. According to tradition, Saint Yared received the inspiration for the church music from God through three birds.",
    significance: "Ethiopian liturgical music is unique in its use of specific instruments like the sistrum (senasel), prayer staff (mequamia), and drums (kebero). The chanting follows specific modes, or scales, associated with different seasons and occasions. The chants are performed by trained church musicians and are an integral part of the lengthy liturgical services.",
    icon: "🎵"
  },
  {
    id: 5,
    name: "Tabot Procession",
    description: "The ceremonial procession of the tabot (replica of the Ark of the Covenant), which is the centerpiece of church consecrations and major festivals.",
    history: "The tradition of the tabot is linked to Ethiopia's claim to house the original Ark of the Covenant, believed to have been brought to Ethiopia by Menelik I, son of King Solomon and the Queen of Sheba. Each church contains a consecrated tabot, a replica of the Ark.",
    significance: "The tabot is the most sacred object in the Ethiopian Orthodox tradition. Normally kept in the Holy of Holies (mekdes) of the church, the tabot is brought out in solemn procession during major festivals like Timket. Only ordained priests may touch the tabot, and it is usually covered with rich cloths when in procession. The presence of a tabot consecrates a church building.",
    icon: "🏺"
  },
  {
    id: 6,
    name: "Ethiopian Cross Tradition",
    description: "The crafting and veneration of distinctive Ethiopian crosses, which feature intricate lattice work and unique designs that vary by region.",
    history: "The Ethiopian cross tradition developed after Christianity became the state religion in the 4th century. Over centuries, distinctive styles emerged in different regions, with various symbolic patterns and designs.",
    significance: "Ethiopian crosses are not just religious symbols but also works of art. They typically feature intricate lattice work and patterns that often include symbolic references to biblical stories or aspects of Ethiopian Orthodox theology. Hand crosses are used by priests for blessing, processional crosses for ceremonies, and pendant crosses are worn by the faithful. The cross designs often incorporate circles, representing eternity and God's unending love.",
    icon: "✝️"
  }
];
