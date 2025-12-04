// ===== CONFIGURATION =====
const CONFIG = {
    SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
    GOOGLE_SHEET_URL: 'YOUR_GOOGLE_SHEET_URL_HERE',
    LOGIN_USERNAME: 'admin',
    LOGIN_PASSWORD: 'nmcp2025',
    STORAGE_KEY_PENDING: 'malariaSupervisionPending',
    STORAGE_KEY_DRAFTS: 'malariaSupervisionDrafts',
    TOTAL_SECTIONS: 10
};

// ===== CASCADING DATA - REGION TO DISTRICT =====
const REGION_DISTRICT_MAP = {
    'Eastern Region': ['Kailahun District', 'Kenema District', 'Kono District'],
    'Northern Region': ['Bombali District', 'Falaba District', 'Koinadugu District', 'Tonkolili District'],
    'North West Region': ['Kambia District', 'Karene District', 'Port Loko District'],
    'Southern Region': ['Bo District', 'Bonthe District', 'Moyamba District', 'Pujehun District'],
    'Western Area': ['Western Area Rural District', 'Western Area Urban District']
};

// ===== CASCADING DATA - DISTRICT TO CHIEFDOM =====
const DISTRICT_CHIEFDOM_MAP = {
    'Bo District': ['Badjia Chiefdom', 'Bagbwe Chiefdom', 'Baoma Chiefdom', 'Bargbo Chiefdom', 'Bo City', 'Bongor Chiefdom', 'Bumpe Ngao Chiefdom', 'Gbo Chiefdom', 'Jaiama Chiefdom', 'Kakua Chiefdom', 'Komboya Chiefdom', 'Lugbu Chiefdom', 'Niawa Lenga Chiefdom', 'Selenga Chiefdom', 'Tikonko Chiefdom', 'Valunia Chiefdom', 'Wonde Chiefdom'],
    'Bonthe District': ['Bendu-Cha Chiefdom', 'Bonthe Town', 'Bum Chiefdom', 'Dema Chiefdom', 'Imperi Chiefdom', 'Jong Chiefdom', 'Kpanda Kemoh Chiefdom', 'Kwamebai Krim Chiefdom', 'Nongoba Bullom Chiefdom', 'Sittia Chiefdom', 'Sogbini Chiefdom', 'Yawbeko Chiefdom'],
    'Moyamba District': ['Bagruwa Chiefdom', 'Bumpeh Chiefdom', 'Dasse Chiefdom', 'Fakunya Chiefdom', 'Kaiyamba Chiefdom', 'Kamajei Chiefdom', 'Kargboro Chiefdom', 'Kongbora Chiefdom', 'Kori Chiefdom', 'Kowa Chiefdom', 'Lower Banta Chiefdom', 'Ribbi Chiefdom', 'Timdale Chiefdom', 'Upper Banta Chiefdom'],
    'Pujehun District': ['Barri Chiefdom', 'Galliness Chiefdom', 'Kabonde Chiefdom', 'Kpaka Chiefdom', 'Kpanga Chiefdom', 'Kpanga Krim Chiefdom', 'Makpele Chiefdom', 'Malen Chiefdom', 'Mano Sakrim Chiefdom', 'Peje Chiefdom', 'Perri Chiefdom', 'Soro Gbeima Chiefdom', 'Sowa Chiefdom', 'Yakemoh Kpukumu Krim Chiefdom'],
    'Kailahun District': ['Dea Chiefdom', 'Jahn Chiefdom', 'Jawei Chiefdom', 'Kissi Kama Chiefdom', 'Kissi Teng Chiefdom', 'Kissi Tongi Chiefdom', 'Luawa Chiefdom', 'Malema Chiefdom', 'Mandu Chiefdom', 'Njaluahun Chiefdom', 'Peje Bongre Chiefdom', 'Peje West Chiefdom', 'Penguia Chiefdom', 'Upper Bambara Chiefdom', 'Yawei Chiefdom'],
    'Kenema District': ['Dama Chiefdom', 'Dodo Chiefdom', 'Gaura Chiefdom', 'Gorama Mende Chiefdom', 'Kandu Leppiama Chiefdom', 'Kenema City', 'Koya (Kenema) Chiefdom', 'Langroma Chiefdom', 'Lower Bambara Chiefdom', 'Malegohun Chiefdom', 'Niawa Chiefdom', 'Nomo Chiefdom', 'Nongowa Chiefdom', 'Simbaru Chiefdom', 'Small Bo Chiefdom', 'Tunkia Chiefdom', 'Wandor Chiefdom'],
    'Kono District': ['Fiama Chiefdom', 'Gbane Chiefdom', 'Gbane Kandor Chiefdom', 'Gbense Chiefdom', 'Gorama Kono Chiefdom', 'Kamara Chiefdom', 'Koidu New Sembehun City', 'Lei Chiefdom', 'Mafindor Chiefdom', 'Nimikoro Chiefdom', 'Nimiyama Chiefdom', 'Sandor Chiefdom', 'Soa Chiefdom', 'Tankoro Chiefdom', 'Toli Chiefdom'],
    'Bombali District': ['Biriwa Chiefdom', 'Bombali Sebora Chiefdom', 'Bombali Serry Chiefdom', 'Gbanti (Bombali) Chiefdom', 'Gbendembu Chiefdom', 'Kamaranka Chiefdom', 'Magbaimba Ndohahun Chiefdom', 'Makarie Chiefdom', 'Makeni City', 'Mara Chiefdom', 'Ngowahun Chiefdom', 'Paki Masabong Chiefdom', 'Safroko Limba Chiefdom'],
    'Falaba District': ['Barawa Wollay Chiefdom', 'Delmandugu Chiefdom', 'Dembelia-Sinkunia Chiefdom', 'Folosaba Dembelia Chiefdom', 'Folosaba Kamba Chiefdom', 'Kabelia Chiefdom', 'Kamadugu Yiraia Chiefdom', 'Kulor Saradu Chiefdom', 'Mongo Chiefdom', 'Morifindu Chiefdom', 'Neya Chiefdom', 'Nyedu Chiefdom', 'Sulima Chiefdom'],
    'Koinadugu District': ['Diang Chiefdom', 'Gbonkorbor Kayaka Chiefdom', 'Kallian Chiefdom', 'Kamukeh Chiefdom', 'Kasunko Kakellay Chiefdom', 'Nieni Chiefdom', 'Sengbeh Chiefdom', 'Thamiso Chiefdom', 'Wara Wara Bafodia Chiefdom', 'Wara Wara Yagala Chiefdom'],
    'Tonkolili District': ['Dansogoia Chiefdom', 'Gbokolenken Masankong Chiefdom', 'Gbokolenken Mayeppoh Chiefdom', 'Gbokolenken Polie Chiefdom', 'Gbokolenken Yele Chiefdom', 'Kafe Chiefdom', 'Kalantuba Chiefdom', 'Kholifa Mabang Chiefdom', 'Kholifa Mamuntha Chiefdom', 'Kholifa Rowalla Chiefdom', 'Kunike Barina Chiefdom', 'Kunike Fulawusu Chiefdom', 'Kunike Sanda Chiefdom', 'Malal Chiefdom', 'Sambaya Bendugu Chiefdom', 'Simiria Chiefdom', 'Tane Chiefdom', 'Yoni Mabanta Chiefdom', 'Yoni Mamala Chiefdom'],
    'Kambia District': ['Bramaia Chiefdom', 'Dixon Chiefdom', 'Gbinleh Chiefdom', 'Konimaka Chiefdom', 'Magbema Chiefdom', 'Mambolo Chiefdom', 'Masumgbala Chiefdom', 'Munu Thalla Chiefdom', 'Samu Chiefdom', 'Tonko Limba Chiefdom'],
    'Karene District': ['Buya Chiefdom', 'Dibia Chiefdom', 'Gbanti (Karene) Chiefdom', 'Gormbahun Chiefdom', 'Mafonda Makerembay Chiefdom', 'Romende Chiefdom', 'Safroko Chiefdom', 'Sanda Loko Chiefdom', 'Sanda Magbolonthor Chiefdom', 'Sanda Tendaren Chiefdom', 'Sella Limba Chiefdom', 'Tambaka Simibungie Chiefdom', 'Tambaka Yobangie Chiefdom'],
    'Port Loko District': ['Bake-Loko Chiefdom', 'Bureh Chiefdom', 'Kaffu Bullom Chiefdom', 'Kamasondo Chiefdom', 'Kasseh Chiefdom', 'Koya (Port Loko) Chiefdom', 'Lokomasama Chiefdom', 'Maconteh Chiefdom', 'Maforki Chiefdom', 'Makama Chiefdom', 'Marampa Chiefdom', 'Masimera Chiefdom', 'Port Loko City', 'Tainkatopa Chiefdom'],
    'Western Area Rural District': ['Koya Rural Zone', 'Mountain Rural Zone', 'Waterloo Rural Zone', 'York Rural Zone'],
    'Western Area Urban District': ['Central 1 Zone', 'Central 2 Zone', 'East 1 Zone', 'East 2 Zone', 'East 3 Zone', 'West 1 Zone', 'West 2 Zone', 'West 3 Zone']
};

// ===== CASCADING DATA - CHIEFDOM TO FACILITY =====
const CHIEFDOM_FACILITY_MAP = {
    // ===== BO DISTRICT =====
    'Badjia Chiefdom': [
        {name: 'Ngelehun (Badjia) CHC', uid: 'xxAfuLUYASs'},
        {name: 'Njagbahun (Badjia) MCHP', uid: 'cOJo1p4XAxY'},
        {name: 'Njandama MCHP', uid: 'gHahSf0ocWN'}
    ],
    'Bagbwe Chiefdom': [
        {name: 'Barlie MCHP', uid: 'AXDmrJDUPHu'},
        {name: 'Benduma (Bagbwe) MCHP', uid: 'HOJJW4KMJ40'},
        {name: 'Kondiama MCHP', uid: 'd5zcRw5mpNg'},
        {name: 'Kpetema (Bagbwe) MCHP', uid: 'NTDg30BR5aE'},
        {name: 'Mendewa MCHP', uid: 'E0Nx6sv2jQl'},
        {name: 'Ngalu CHC', uid: 'AAucxqkPCCs'},
        {name: 'Samie Buma MCHP', uid: 'PbAKKoY2Xn2'}
    ],
    'Baoma Chiefdom': [
        {name: 'Baoma Station CHP', uid: 'l89SIj2IW4s'},
        {name: 'Blamawo MCHP', uid: 'CE5pnIxyC8N'},
        {name: 'Faabu CHP', uid: 'QzYcIsVOkkl'},
        {name: 'Foindu (Baoma) MCHP', uid: 'UNw3KKkLz5L'},
        {name: 'Gbahama (Baoma) CHP', uid: 'u3r73ievj9X'},
        {name: 'Gerehun CHC', uid: 'N2qh71tlndR'},
        {name: 'Golu MCHP', uid: 'R5RPPcOT42N'},
        {name: 'Jan Christian Helvings Clinic', uid: 'oyUsxRqvJuq'},
        {name: 'Jembe CHC', uid: 'NRQhr9mRbvg'},
        {name: 'Jormu (Baoma) MCHP', uid: 'LINvRs3TuWz'},
        {name: 'Kigbai MCHP', uid: 'pmB4RJrX7Yg'},
        {name: 'Kpunbu MCHP', uid: 'R68XPuxE2pQ'},
        {name: 'Mbundorbu MCHP', uid: 'rBXWCqasEep'},
        {name: 'Pelewahun (Baoma) MCHP', uid: 'l4xpXraVCEr'},
        {name: 'Tugbebu CHP', uid: 'o4uvc9G7Iea'},
        {name: 'Yakaji MCHP', uid: 'hI8RctfeeRG'},
        {name: 'Yamandu CHC', uid: 'xr9oim3iNeN'}
    ],
    'Bargbo Chiefdom': [
        {name: 'Bum Kaku MCHP', uid: 'nEKRLODGSvu'},
        {name: 'Gbangbalia MCHP', uid: 'TWs7r2pwgA2'},
        {name: 'Jimmi CHC', uid: 'GFOA7ElH2nz'},
        {name: 'Kakama MCHP', uid: 'f43ANgdLi4n'},
        {name: 'Kasse MCHP', uid: 'dVeSQNy2JnM'},
        {name: 'Limba CHP', uid: 'nsKVgBvE0Cu'},
        {name: 'Mano Yorgbo MCHP', uid: 'ldBdI5h4oYh'},
        {name: 'Momajo CHP', uid: 'JkhTT88Yd3L'},
        {name: 'Niagorehun (Bargbo) CHP', uid: 'y75f9JLGGxi'},
        {name: 'Senehun Ngolan MCHP', uid: 'KMIVkhMUIdq'}
    ],
    'Bo City': [
        {name: 'Aethel CHP', uid: 'WSwok5mgGTQ'},
        {name: 'Agape Way CHP', uid: 'eAZY7IezaJG'},
        {name: 'Anglican Diocese Clinic', uid: 'I7W07ZGu670'},
        {name: 'Batiama Layout MCHP', uid: 'ha9n2GGrji4'},
        {name: 'Bo Government Hospital', uid: 'D7qLI3Fw3kb'},
        {name: 'Bo School Bay CHP', uid: 'oFSPdjhEbtD'},
        {name: 'Breakthrough MCHP', uid: 'LuCtUscwaKK'},
        {name: 'Brima Town CHP', uid: 'WdbymisCUKY'},
        {name: 'EDC Unit CHP', uid: 'kpmDNRJp2Tf'},
        {name: 'Favour MCHP', uid: 'lBCScMxoXCK'},
        {name: 'Gbanja Town MCHP', uid: 'yU9j7RDpFXR'},
        {name: 'Gbotima CHP', uid: 'L8CvmIKRbX4'},
        {name: 'Genda CHP', uid: 'ZTwV55096uQ'},
        {name: 'Genda MCHP', uid: 'h939elM5K3i'},
        {name: 'Gilas Hospital', uid: 'z86IRChoV4i'},
        {name: 'Haikel CHP', uid: 'EFrGrDPvbEU'},
        {name: 'Kakua Static CHC', uid: 'T2zV9tsJrfV'},
        {name: 'Kandeh Town CHP', uid: 'u3wsHXrJQeW'},
        {name: 'Kindoya Hospital', uid: 'LPTEUCSHLxG'},
        {name: 'Kowama (Kakua) CHP', uid: 'cLKNf16CTLk'},
        {name: 'Lewaibu CHP', uid: 'Mm8LY8fBEiU'},
        {name: 'Lyn Maternity MCHP', uid: 'qxS4hiJlwU9'},
        {name: 'Manjiama CHC', uid: 'cvYKC4osWt6'},
        {name: 'Mercy Ships (Bo City) Hospital', uid: 'XLyiQcXoF7G'},
        {name: 'Mid Land MCHP', uid: 'd58PMi0xtf1'},
        {name: 'Morning Star CHP', uid: 'o51nzNzzpSk'},
        {name: 'Nafaya MCHP', uid: 'rFtT506fyLX'},
        {name: 'Needy CHP', uid: 'TFAeqrUzDW0'},
        {name: 'New Police Barracks CHC', uid: 'Bx40lRUXCUJ'},
        {name: 'Praise Foundation CHC', uid: 'YxSM8NSSbMg'},
        {name: 'Red Cross (Bo City) CHC', uid: 'FifERVq2d4i'},
        {name: 'Rescue Health Care Clinic', uid: 'oRNjjpi62YM'},
        {name: 'Simbo Town CHP', uid: 'bfMRCekrHr9'},
        {name: "Sowa's Clinic", uid: 'jiYUnjN9QvC'},
        {name: 'Spllenz Clinic', uid: 'VJnDFf60fKD'},
        {name: "St Monica's Clinic", uid: 'smFURXEtVbk'},
        {name: 'Tengbewabu MCHP', uid: 'rc7YGmeRmyj'},
        {name: 'Topkoi Town CHP', uid: 'VraSTB5CQXk'},
        {name: 'UNIMUS MCHP', uid: 'WhZ5SLuarTR'},
        {name: 'Walk In Medical Associate Clinic', uid: 'PGPC9HH1tom'},
        {name: 'Yemoh Town CHC', uid: 'lUI6wH9tsB6'}
    ],
    'Bongor Chiefdom': [
        {name: 'Gbaama MCHP', uid: 'zwVTPgv0ryi'},
        {name: 'Lowoma (Bongor) MCHP', uid: 'Awk7ww8OM80'},
        {name: 'Mamboma (Bongor) CHC', uid: 'bFuRoF35FXE'},
        {name: 'Telu CHC', uid: 'dIeej0sV2V7'}
    ],
    'Bumpe Ngao Chiefdom': [
        {name: 'Bongor (Bumpe Ngao) MCHP', uid: 'XYloe0omDWO'},
        {name: 'Buma MCHP', uid: 'YptqXbFt3DG'},
        {name: 'Bumpe CHC', uid: 'RrTVO31OxpA'},
        {name: 'Kabiyama MCHP', uid: 'UMR51omy4q1'},
        {name: 'Kaniya MCHP', uid: 'f1t6jNWBFVd'},
        {name: 'Kpetema (Bumpe Ngao) CHP', uid: 'fheE9dp532A'},
        {name: 'Makayonie MCHP', uid: 'jSozK0PVtWP'},
        {name: 'Mokoba MCHP', uid: 'pCHMk80BzXO'},
        {name: 'Mokpende MCHP', uid: 'FwN4Rsm5TEY'},
        {name: 'Ngolahun (Bumpe Ngao) CHC', uid: 'nS2on8qVTQM'},
        {name: 'Niagorehun Vaakie MCHP', uid: 'pILvKo2lqdG'},
        {name: 'Sahn (Bumpe Ngao) CHP', uid: 'cfkFiNU6nnX'},
        {name: 'Serabu (Bumpe Ngao) CHC', uid: 'cy9IVBoiNXa'},
        {name: 'Serabu Mission Hospital', uid: 'HcYYi1fDRey'},
        {name: 'Taninahun (Bumpe Ngao) CHP', uid: 'L0cnW68A5WE'},
        {name: 'Walihun (Bumpe Ngao) MCHP', uid: 'XRDHnQLSHUZ'},
        {name: 'Yengema (Bumpe Ngao) MCHP', uid: 'NfNKUofwip4'}
    ],
    'Gbo Chiefdom': [
        {name: 'Gbaiima CHC', uid: 'AtWuGFSTeVa'},
        {name: 'Sembehun Mamagewoh CHC', uid: 'bWO8OMmimpO'}
    ],
    'Jaiama Chiefdom': [
        {name: 'Koribondo CHC', uid: 'i6iY8CjKw1s'},
        {name: 'Mano-Jaiama CHP', uid: 'tkKtRG1rnxS'},
        {name: 'Niayahun CHP', uid: 'uiPiTHCfDIZ'}
    ],
    'Kakua Chiefdom': [
        {name: 'Bandajuma MCHP', uid: 'AjT1vKkEbqM'},
        {name: 'Bo Childrens Hospital', uid: 'FRl0pZuDmud'},
        {name: 'Egyptian (Bo) Clinic', uid: 'si6mjhFEeiL'},
        {name: 'Fengehun MCHP', uid: 'PVw34YtWIiV'},
        {name: 'Fullawahun MCHP', uid: 'aMufnPUnfFn'},
        {name: 'Gbongboma MCHP', uid: 'njX42Os6K4I'},
        {name: 'Gender CHP', uid: 'qqYhq4M99dW'},
        {name: 'Keindeyella MCHP', uid: 'Q9MxLIVCPRB'},
        {name: 'Maguama CHP', uid: 'btBGqJ4974o'},
        {name: 'Mamasa Life Saving Hospital', uid: 'jsOtOB8BqL4'},
        {name: 'Manjiama CHC', uid: 'cvYKC4osWt6'},
        {name: 'Marie Stopes (Kakua) Clinic', uid: 'qAb2QoUbso9'},
        {name: 'Massah Memorial Maternity MCHP', uid: 'VhE0ClYdhrP'},
        {name: 'Ndegbomie MCHP', uid: 'zoFXL4QsT8P'},
        {name: 'Nduvuibu MCHP', uid: 'GRyvlErDEZK'},
        {name: 'United Methodist Church Manjama CHC', uid: 'P44v7FIDPHi'},
        {name: 'Veronical MCHP', uid: 'v1fYCa9bwAz'}
    ],
    'Komboya Chiefdom': [
        {name: 'Gumahun MCHP', uid: 'KzLUzAFG4vk'},
        {name: 'Komboya Gbauja MCHP', uid: 'TAcdD59nhF1'},
        {name: 'Kpamajama MCHP', uid: 'Cmj8RzTSado'},
        {name: 'Mano (Komboya) MCHP', uid: 'ragWKvb9T6b'},
        {name: 'Niagorehun (Komboya) MCHP', uid: 'OcdvWKsGoGN'},
        {name: 'Njala (Komboya) CHC', uid: 'JFLbrxGTTAy'},
        {name: 'Teibor CHP', uid: 'GRJA3dqasxe'}
    ],
    'Lugbu Chiefdom': [
        {name: 'Bontiwo MCHP', uid: 'RDmjwGyoSES'},
        {name: 'Feiba CHP', uid: 't0Vax156I3m'},
        {name: 'Hima MCHP', uid: 'gWwcVMzf77Q'},
        {name: 'Karleh MCHP', uid: 'IfaHaauqm0n'},
        {name: 'Kpetewoma CHP', uid: 'HZGZi0i7BNa'},
        {name: 'Ngieyehun MCHP', uid: 'ArrJA8PRSDj'},
        {name: 'Sumbuya (Lugbu) CHC', uid: 'z2QZDeWxL6K'},
        {name: 'Upper Saama MCHP', uid: 'nmlr4KF8x8h'},
        {name: 'Yambama CHP', uid: 'Np0E9ki4nMM'}
    ],
    'Niawa Lenga Chiefdom': [
        {name: 'Korbu MCHP', uid: 'YSwiqygcxoD'},
        {name: 'Nengbema CHP', uid: 'cMVwxnX3dLf'},
        {name: 'Ngogbebu MCHP', uid: 'bzqVVjEyjZz'},
        {name: 'Pendebu MCHP', uid: 'rR5lwQ3xsRz'},
        {name: 'Sahn (Niawa Lenga) CHC', uid: 'ObMHcW3CqYl'}
    ],
    'Selenga Chiefdom': [
        {name: 'Damballa CHC', uid: 'Q2BpOwSDTGF'},
        {name: 'Gbangba MCHP', uid: 'vzSBxowlHgB'}
    ],
    'Tikonko Chiefdom': [
        {name: 'Gondama (Tikonko) CHC', uid: 'mP23PpJgFhZ'},
        {name: 'Griema MCHP', uid: 'upuYzgLwdFq'},
        {name: 'Haikal CHP', uid: 'QH4mNtvUYRr'},
        {name: 'Kassama MCHP', uid: 'HXQKXYjAmxU'},
        {name: 'Mattru on the Rail MCHP', uid: 'CITC0cxFHeS'},
        {name: 'Mendewa 2 Clinic', uid: 'MYe9FskMmvY'},
        {name: 'Mendewa CHP', uid: 'f4m51PDIUwM'},
        {name: 'Sebehun Tarbay MCHP', uid: 'wI928yx6PoZ'},
        {name: 'Sembehun 17 (Tikonko) CHP', uid: 'js5XC46QfPl'},
        {name: 'Theresa Hakim CHP', uid: 'I8AeFtHBbLs'},
        {name: 'Tikonko (Bo) CHC', uid: 'Vt8oBytNoCk'},
        {name: 'Towama MCHP', uid: 'qg0ySgyJVtM'},
        {name: 'Veronica MCHP', uid: 'J99Dc48MRAd'},
        {name: 'We Care Health Centre Clinic', uid: 'XnxQS4CBwqu'},
        {name: 'Zion CHC', uid: 'aa8238JXtLW'}
    ],
    'Valunia Chiefdom': [
        {name: 'Baomahun CHC', uid: 'oZBaoi3X5Fm'},
        {name: 'Foya (Valunia) CHP', uid: 'gzXdO9HoEuz'},
        {name: 'Grima (Valunia) CHP', uid: 'di0qSeDN03U'},
        {name: 'Kenema Blango CHC', uid: 'HUXsIOV95tE'},
        {name: 'Kpewama MCHP', uid: 'Uhm5DvUFHj6'},
        {name: 'Kpuabu MCHP', uid: 'Vt0bSqXM0Dv'},
        {name: 'Mongere CHC', uid: 'mnNuvytqVBz'},
        {name: 'Ngolahun Jabaty CHP', uid: 'SSKjfaYvTIs'},
        {name: 'Pujehun (Valunia) CHP', uid: 'aiUAveCpORI'}
    ],
    'Wonde Chiefdom': [
        {name: 'Bathurst MCHP', uid: 'tjjzKnV5O34'},
        {name: 'Fanima (Wonde) MCHP', uid: 'iohL3LoFsaw'},
        {name: 'Gboyama CHC', uid: 'reUdH29BAmv'},
        {name: 'Kambawama MCHP', uid: 'Ufj92A9cwNR'}
    ],
    // ===== BONTHE DISTRICT =====
    'Bendu-Cha Chiefdom': [
        {name: 'Bendu (Bendu-Cha) CHC', uid: 'wKVf3oDEm51'},
        {name: 'Foya (Bendu-Cha) CHP', uid: 'Mvn2GKJmDQC'},
        {name: 'Giebina CHP', uid: 'p5kBeNos0M5'},
        {name: 'Mindohun MCHP', uid: 'wHtfN7v9m77'},
        {name: 'Mo-Davies CHP', uid: 'AJ43cn9A4eB'},
        {name: 'Taigbe CHP', uid: 'U8od9V8N9hW'}
    ],
    'Bonthe Town': [
        {name: 'Bonthe Government Hospital', uid: 'Or0PYldj2sY'},
        {name: 'Bonthe Under Fives Clinic', uid: 'gg9ILXQyOTo'},
        {name: 'Red Cross (Bonthe) CHP', uid: 'xYjeE5229M9'},
        {name: "St Joseph's Clinic", uid: 'L6PN6DEwUDL'},
        {name: 'York Island CHP', uid: 'HJHoHLTAaa8'}
    ],
    'Bum Chiefdom': [
        {name: 'Karlleh MCHP', uid: 'PDWhySxcS5X'},
        {name: 'Madina (Bum) CHC', uid: 'jPifO0P2rgR'},
        {name: 'Mammy CHP', uid: 'xBBqRJiNvp2'},
        {name: 'Ngepehun CHP', uid: 'oJQ9xxNxcwq'},
        {name: 'Ngessehun MCHP', uid: 'KmJFBSPtB54'},
        {name: 'Sogballeh MCHP', uid: 'MopAmGVQWMx'},
        {name: 'Tassor CHP', uid: 'KKlzTwglE6K'},
        {name: 'Torma Bum CHP', uid: 'GChq3aSncSt'}
    ],
    'Dema Chiefdom': [
        {name: 'Bumpetoke (Dema) CHP', uid: 'jSVtKyWsftB'},
        {name: 'Mbaoma (Dema) CHP', uid: 'mgpoNFQtlEy'},
        {name: 'Tissana (Dema) CHC', uid: 'ppHuX58L9Gd'},
        {name: 'Tombay CHP', uid: 'pKNXcOdPuJE'}
    ],
    'Imperi Chiefdom': [
        {name: 'Gaindema CHP', uid: 'imL8IokwAtN'},
        {name: 'Gbamgbaia CHC', uid: 'Co1dfRCfMbm'},
        {name: 'Gbamgbama CHC', uid: 'sOABByKQN2C'},
        {name: 'Jangallor CHP', uid: 'S7enj70xwme'},
        {name: 'Junctionla MCHP', uid: 'sTPNHdC0WB3'},
        {name: 'Mo-Kepay CHP', uid: 'F095zzRZ6OW'},
        {name: 'Mogbwemo CHC', uid: 'nWBKiK5UGjh'},
        {name: 'Mokaba MCHP', uid: 'IyLyjwKuhQ7'},
        {name: 'Moriba Town (Imperri) CHC', uid: 'VPgrzDl4lIZ'},
        {name: 'Mount Hope Hospital', uid: 'ydEHxZckeyI'},
        {name: 'Sierra Rutile Hospital', uid: 'L1YGybE1RPP'},
        {name: 'Victoria MCHP', uid: 'Bsb8Kgtam16'},
        {name: 'Yargoi CHP', uid: 'VuagxFUoyAe'}
    ],
    'Jong Chiefdom': [
        {name: 'Barbar MCHP', uid: 'cB0TNeTP4kw'},
        {name: 'Gambia CHC', uid: 'xZyX5ECp4UV'},
        {name: 'Gbaninga CHP', uid: 'KmiQacDahWa'},
        {name: 'Henry Kormoi Community Hospital', uid: 'aha8Pp6ypXA'},
        {name: 'Jorma CHP', uid: 'rI6RLtgCEUv'},
        {name: 'Kabati CHP', uid: 'RbtQIc0nRQG'},
        {name: 'Komende (Jong) MCHP', uid: 'jD24X7Uh6iL'},
        {name: 'Mattru CHC', uid: 'ynQ93yBzX0X'},
        {name: 'Mattru UBC Hospital', uid: 'U5qwUXl8Hta'},
        {name: 'Mo-Savie MCHP', uid: 'WaXXUDEeMdH'},
        {name: 'Mogbwe MCHP', uid: 'SmufKPM6F1S'},
        {name: 'Mongerewa MCHP', uid: 'yUtpM7AdkRJ'},
        {name: 'Moyowa MCHP', uid: 'AuR9VGx49lF'},
        {name: 'Red Cross (Mattru) CHP', uid: 'ckQjSzyWtBk'},
        {name: 'Segbwema (Jong) CHP', uid: 'b8DFgnIAInF'},
        {name: 'Semabu (Jong) CHP', uid: 'TR8BP4QLWFG'},
        {name: 'Tissana (Jong) CHP', uid: 'LqxbjRHa7M0'}
    ],
    'Kpanda Kemoh Chiefdom': [
        {name: 'Gambia Popayma MCHP', uid: 'UzlQqYE14P4'},
        {name: 'Gbongeh MCHP', uid: 'G1acFFWS0Nm'},
        {name: 'Lawana (Kpanda Kemo) MCHP', uid: 'wdAT9WFnMRG'},
        {name: 'Mottuo CHC', uid: 'nBqgr8q4ru4'},
        {name: 'Senjehun MCHP', uid: 'gNR9A0kNCrH'}
    ],
    'Kwamebai Krim Chiefdom': [
        {name: 'Benduma CHC', uid: 'npEUvVio8ii'},
        {name: 'Hoya CHP', uid: 'oVuIMrwY2K7'},
        {name: 'Massah Kpoanguma CHP', uid: 'TvmO7BdukmQ'},
        {name: 'Mosenteh CHP', uid: 'X4z4mWxt1hY'},
        {name: 'Tei CHP', uid: 'Vho0loUyisJ'},
        {name: 'Topain CHP', uid: 'FeVxJlCI7zn'}
    ],
    'Nongoba Bullom Chiefdom': [
        {name: 'Batahall CHP', uid: 'f8aIYL32iyY'},
        {name: 'Gbamani CHP', uid: 'TRq95dP8UMz'},
        {name: 'Gbap CHC', uid: 'oaSRZBMnZe2'},
        {name: 'Maamu MCHP', uid: 'krzYPeLAQYo'},
        {name: 'Mbaoma Kpengeh CHC', uid: 'GC5BuDMDVii'},
        {name: 'Mbaoma Kpengeh CHP', uid: 'vGa45jZb04e'},
        {name: 'Minah CHP', uid: 'nBBCfxE9HF0'},
        {name: 'Ngaringa MCHP', uid: 'RrktxfEZz4n'},
        {name: 'Sembehun (Nongoba Bullom) MCHP', uid: 'xXRuDCO3KCP'},
        {name: 'Subu MCHP', uid: 'wzGJPFKnpdg'},
        {name: 'Torma Gbagba CHP', uid: 'C0G2TiYnadO'},
        {name: 'Waiba MCHP', uid: 'xcaJwQnDgXQ'}
    ],
    'Sittia Chiefdom': [
        {name: 'Delken CHC', uid: 'hPLxMYcfmzm'},
        {name: 'Delken MCHP', uid: 'H0ZvygklUsH'},
        {name: 'Mania MCHP', uid: 'PPef1hL80Aw'},
        {name: 'Mbokie MCHP', uid: 'DpZ69xKOqOm'},
        {name: 'Mo-Sandi CHP', uid: 'qUMMYLkaM7z'},
        {name: 'Ngepay CHP', uid: 'WthF78OKyDr'},
        {name: 'Sanhaya CHP', uid: 'dSLGODFPGFJ'},
        {name: 'Yoni (Sittia) CHC', uid: 'EUG8gAz4W8B'}
    ],
    'Sogbini Chiefdom': [
        {name: 'Grima (Sogbini) CHP', uid: 'mTm7KGnkEvM'},
        {name: 'Kanga (Sogbini) MCHP', uid: 'FeYyR1G7kSm'},
        {name: 'Kpetema (Sogbini) MCHP', uid: 'NH4V6SIF5sW'},
        {name: 'Mandu CHP', uid: 'YsSDNzWkPNJ'},
        {name: 'Ngueh MCHP', uid: 'fDsyaVsVXtP'},
        {name: 'Tihun CHC', uid: 'Ed883i2LSPl'}
    ],
    'Yawbeko Chiefdom': [
        {name: 'Mobefa MCHP', uid: 'HRgPgP7REiZ'},
        {name: 'Sargor CHP', uid: 'wziv4AhFEKx'},
        {name: 'Senehun Gbloh MCHP', uid: 'tjvAApiMzt9'},
        {name: 'Talia (Yawbeko) CHC', uid: 'isvnRq6xErg'},
        {name: 'Tuakan CHP', uid: 'jCXX7wjbjXZ'}
    ],
    // ===== MOYAMBA DISTRICT =====
    'Bagruwa Chiefdom': [
        {name: 'Benkeh MCHP', uid: 'yofFvlFvTsj'},
        {name: 'Kawaya CHP', uid: 'SH5HZ2VeDHC'},
        {name: 'Mokassie CHP', uid: 'TMHW0e4brAF'},
        {name: 'Mosenegor MCHP', uid: 'mR0Oxuvc3Ck'},
        {name: 'Ngiebu CHC', uid: 'IbDblg2OmWQ'},
        {name: 'Sembehun (Bagruwa) CHC', uid: 'usqoNUUysSb'},
        {name: 'Sembehunwo MCHP', uid: 'ZCLa8KLzT7y'}
    ],
    'Bumpeh Chiefdom': [
        {name: 'Belletin CHP', uid: 'bC4V8f2PSZl'},
        {name: 'Bumpeh River CHP', uid: 'oOzeViuMhSg'},
        {name: 'Mende Town MCHP', uid: 'aVLwrBQCqwa'},
        {name: 'Moforay MCHP', uid: 'DPeY2ZmVnhm'},
        {name: 'Mokaiyegbeh MCHP', uid: 'T2ndMptANly'},
        {name: 'Mosella CHP', uid: 'PVJfUqlqKBr'},
        {name: 'Motorbong MCHP', uid: 'gxvlA4u8Bfq'},
        {name: 'Moyeamoh CHP', uid: 'R45zyrXDMao'},
        {name: 'Rotifunk CHC', uid: 'CTpI97UydOO'},
        {name: 'Sahun (Bumpeh) MCHP', uid: 'tpp49XegPqp'},
        {name: 'Samu CHP', uid: 'pownNNHCYhZ'},
        {name: 'Seweima MCHP', uid: 'u7mA5SlAcwI'},
        {name: 'UMC Rotifunk Hospital', uid: 'gysZXIVHrzY'},
        {name: 'Yenkessa MCHP', uid: 'Oxir4GKFJNv'}
    ],
    'Dasse Chiefdom': [
        {name: 'Bambuibu Tommy MCHP', uid: 'm4jN7trCLoI'},
        {name: 'Hope Rising CHP', uid: 'DebR9bmmrAN'},
        {name: 'Kabaima MCHP', uid: 'ES1PqKGAySR'},
        {name: 'Kenema Gbandoma MCHP', uid: 'LEopcbdWYkv'},
        {name: 'Laugh Out Loud Clinic', uid: 'k5hMbks46E0'},
        {name: 'Laught Out Loud Clinic', uid: 'jRmjGcBsAdw'},
        {name: 'Mano (Dasse) CHC', uid: 'gB4a65YWQeV'},
        {name: 'Mogbaske CHP', uid: 'ywjhytbQakY'},
        {name: 'Taninihun Kapuima MCHP', uid: 'ObQF3ol9Q3r'}
    ],
    'Fakunya Chiefdom': [
        {name: 'Falaba MCHP', uid: 'dTHuI3mBVPD'},
        {name: 'Gandorhun (Fakunya) CHC', uid: 'ZcKEFm4KZic'},
        {name: 'Mokalley MCHP', uid: 'VTEh5a5L6ns'},
        {name: 'Mokorewa MCHP', uid: 'ZS5tHnbSyS4'},
        {name: 'Moyamba Junction CHC', uid: 'Lb2j5Jz1M7v'},
        {name: 'Moyollo MCHP', uid: 'gz29NRPuuM6'},
        {name: 'Njagbahun (Fakunya) MCHP', uid: 'JQHX6wOPUKl'},
        {name: 'Rotawa CHP', uid: 'hVX8qsOsX8R'}
    ],
    'Kaiyamba Chiefdom': [
        {name: 'Gbonjeima MCHP', uid: 'yVysLeYBG2J'},
        {name: 'Kangahun CHC', uid: 'LxpZQlIR30v'},
        {name: 'Komende (Kaiyamba) MCHP', uid: 'uy5nI2JV292'},
        {name: 'Korgbotuma MCHP', uid: 'KypTZzNDZdY'},
        {name: 'Levuma (Kaiyamba) MCHP', uid: 'TIOwvOTgR6W'},
        {name: 'Moyamba Government Hospital', uid: 'shxicAwesn1'},
        {name: 'Moyamba Static 1 CHP', uid: 'uzJVqi5wYdf'},
        {name: 'Moyamba Static 2 CHC', uid: 'Fsjt3s4bw7S'},
        {name: 'Salina CHP', uid: 'lpimQydyijo'},
        {name: 'Yoyema MCHP', uid: 'JhTDyrhbWwj'}
    ],
    'Kamajei Chiefdom': [
        {name: 'Gondama (Kamajei) CHP', uid: 'nPARkiIS8iF'},
        {name: 'Joyah MCHP', uid: 'ZGThBcdSOkk'},
        {name: 'Mogbuama MCHP', uid: 'rvR9kOXLpQH'},
        {name: 'Senehun (Kamajei) CHC', uid: 'A3GcBew4orK'}
    ],
    'Kargboro Chiefdom': [
        {name: 'Bumpetoke (Kargboro) CHP', uid: 'hdvksIOt06Q'},
        {name: 'Mokaisumana CHP', uid: 'Ma2U2kjFZqn'},
        {name: 'Mokandoh CHP', uid: 'HLcp45RA3l0'},
        {name: 'Mokobo MCHP', uid: 'SUaCsfdZhSU'},
        {name: 'Mokonbetty MCHP', uid: 'DlknJdmC8X2'},
        {name: 'Mopailleh MCHP', uid: 'y3WxvO0xKSk'},
        {name: 'Ngeihun (Kargboro) MCHP', uid: 'HD8ljkShOVG'},
        {name: 'Plaintain Island MCHP', uid: 'zFClhaAtatj'},
        {name: 'Shenge CHC', uid: 'NkrCs9vbXRT'},
        {name: 'Yorgbofore CHC', uid: 'coF2L7KvREd'},
        {name: 'Yorgbofore MCHP', uid: 'muwVrMzUYKH'},
        {name: 'Youndu CHP', uid: 'pmWucBbNz7v'}
    ],
    'Kongbora Chiefdom': [
        {name: 'Bauya (Kongbora) CHC', uid: 'QjQdgcF60pd'},
        {name: 'Lawana (Kongbora) MCHP', uid: 'TQbrRF6gjn5'},
        {name: 'Levuma Nyomeh CHP', uid: 't0goEU0zajU'},
        {name: 'Magbenka CHP', uid: 'H2DJR9sZh5M'},
        {name: 'Taninihun Mboka MCHP', uid: 'B5r1qPpxngC'}
    ],
    'Kori Chiefdom': [
        {name: 'Bai Largo MCHP', uid: 'fEcMul1miAw'},
        {name: 'Fogbo (Kori) CHP', uid: 'GXO0sc8UbYF'},
        {name: 'Gbuihun MCHP', uid: 's9gLF7qFI2k'},
        {name: 'Judy Smith CHP', uid: 'xPRDtKMkCQW'},
        {name: 'Juma MCHP', uid: 'zJ0XxHU5vZk'},
        {name: 'Konda CHP', uid: 'gElqpDtUsaC'},
        {name: 'Manjeihun MCHP', uid: 'F9VTlWW6qb7'},
        {name: 'Mosongo MCHP', uid: 'a3nYVTgslBy'},
        {name: 'Njala (Kori) CHC', uid: 'H7xLsOC2N3m'},
        {name: 'Njala University Hospital', uid: 'VlYuMygld6M'},
        {name: 'Taiama (Kori) CHC', uid: 'rc8w7wb6e0z'},
        {name: 'United Methodist Church Taiama CHP', uid: 'tBll4l0vIJc'},
        {name: 'Waiima (Kori) MCHP', uid: 'Vy1KsK7ndSv'}
    ],
    'Kowa Chiefdom': [
        {name: 'Bendu (Kowa) MCHP', uid: 'daVmo6SXi1Q'},
        {name: 'Mofombo MCHP', uid: 'MpUzbE4uElL'},
        {name: 'Njama (Kowa) CHC', uid: 'fMCvdQ7iXmK'},
        {name: 'Tabe MCHP', uid: 'A0YEeEEZ0qk'}
    ],
    'Lower Banta Chiefdom': [
        {name: 'Gbangbatoke CHC', uid: 'XHHguFd7CEf'},
        {name: 'Kanga (Lower Banta) MCHP', uid: 'UZJGNDdjB0W'},
        {name: 'Mokanji CHC', uid: 'XgMtaugamtW'},
        {name: 'Mokotawa CHP', uid: 'wbRQAfj7atb'},
        {name: 'Moriba Town (Lower Banta) CHC', uid: 'L9c8GttwDSQ'},
        {name: 'Moriba Town (Lower Banta) CHP', uid: 'WiNTyQyN3Zf'},
        {name: 'Mosenesie Junction CHP', uid: 'aR7rHt3nwnh'},
        {name: 'Njagbahun (Lower Banta) MCHP', uid: 'MwFefAhmNIt'},
        {name: "St Mary's Clinic", uid: 'gcIfzSrM2ST'}
    ],
    'Ribbi Chiefdom': [
        {name: 'Bradford CHC', uid: 'yjgwoAnmcFn'},
        {name: 'Ferry CHP', uid: 'gYXVxstIDSp'},
        {name: 'Mabang (Ribbi) MCHP', uid: 'Apxujc4njKT'},
        {name: 'Mogbongisseh MCHP', uid: 'QNEdBz16I4g'},
        {name: 'Mokorbu MCHP', uid: 'z8ap2iTMIx3'},
        {name: 'Motoni CHC', uid: 'PDhArwGhL5E'},
        {name: 'Motoni MCHP', uid: 'h1wK93rCpsA'},
        {name: 'Motonkoh MCHP', uid: 'x4Eed7qLRQM'},
        {name: 'Rokolor MCHP', uid: 'oMlGE1UbIkX'},
        {name: 'Suen CHP', uid: 'p7Oz8Q3uQ4w'}
    ],
    'Timdale Chiefdom': [
        {name: 'Bomotoke CHC', uid: 'odmRUOHCHpl'},
        {name: 'Mokaiyamba MCHP', uid: 'OKaPGd5I1Wx'},
        {name: 'Mokpanabom MCHP', uid: 'Yb3ITVSwWuW'},
        {name: 'Mosagbeh MCHP', uid: 'yCxVqmqe5Sr'},
        {name: 'Mosanda CHP', uid: 'y93XQ0qhM6Q'}
    ],
    'Upper Banta Chiefdom': [
        {name: 'Children of the Nation Ngolala CHP', uid: 'WoS6RQoMpis'},
        {name: 'Gondama (Upper Banta) MCHP', uid: 'F97HfubuviQ'},
        {name: 'Modonkor CHP', uid: 'b0qA5NkOT5X'},
        {name: 'Mogomgbe MCHP', uid: 'P07Nrpuvlal'},
        {name: 'Mokelleh CHC', uid: 'wPVKhcwmFb6'}
    ],
    // ===== PUJEHUN DISTRICT =====
    'Barri Chiefdom': [
        {name: 'Bandasuma (Barri) CHC', uid: 'ZZ3df7Nzbn0'},
        {name: 'Jeoma Barri MCHP', uid: 'kaJ56XLzEsu'},
        {name: 'Konia (Barri) MCHP', uid: 'ZAnsifYcOA9'},
        {name: 'Kundorwahun CHP', uid: 'jRnF4IbWcts'},
        {name: 'Njaluahun (Barri) CHP', uid: 'JLnVLgfsYUT'},
        {name: 'Potoru CHC', uid: 'NB7youiWZyr'},
        {name: 'Saahun (Barri) MCHP', uid: 'CLy2PaLEwjS'},
        {name: 'Tambeiyama MCHP', uid: 'fU0xfQPlpj2'},
        {name: 'Taninahun (Barri) MCHP', uid: 'plGaCqBh6MY'},
        {name: 'Vaama (Barri) CHP', uid: 'jERc68Sr7Bp'},
        {name: 'Waiima (Barri) MCHP', uid: 'A77UrwwlYgE'}
    ],
    'Galliness Chiefdom': [
        {name: 'Bandama (Galliness) MCHP', uid: 'YhtEP5znngl'},
        {name: 'Blama Massaquoi CHC', uid: 'F25TjQ4UIyz'},
        {name: 'Fonikoh MCHP', uid: 'rjWTV80zbSD'},
        {name: 'Funyehun CHP', uid: 'XwDJOPGcMaw'},
        {name: 'Kpetema (Galliness) MCHP', uid: 'MuhGY1bu7C2'},
        {name: 'Kpowubu MCHP', uid: 'lqnF0cmpWWn'},
        {name: 'Makorma CHP', uid: 'APB73IIHig5'}
    ],
    'Kabonde Chiefdom': [
        {name: 'Pehala CHC', uid: 'IplEJtpNXvA'}
    ],
    'Kpaka Chiefdom': [
        {name: 'Liya MCHP', uid: 'OFMF56v7vl8'},
        {name: 'Massam CHC', uid: 'ADKnHIz8c7V'},
        {name: 'Saahun (Kpaka) MCHP', uid: 'UM7hg3e4Ybq'},
        {name: 'Semabu (Kpaka) MCHP', uid: 'EU7IzzJ2kj7'},
        {name: 'Sumbuya Bessima CHP', uid: 'uooiBFlG6t7'}
    ],
    'Kpanga Chiefdom': [
        {name: 'Basalleh MCHP', uid: 'Bx2bBA2kaq4'},
        {name: 'Blama Puilla MCHP', uid: 'GyE6d0nN2zC'},
        {name: 'Bomu Samba MCHP', uid: 'k6110nfGTK3'},
        {name: 'Dandabu CHP', uid: 'a0Va6xnQqOo'},
        {name: 'Gbondapi CHC', uid: 'nl0zlkXNtK4'},
        {name: 'Gibina MCHP', uid: 'UnP1GKv5J6R'},
        {name: 'Mandeima MCHP', uid: 'bdld6OpczDY'},
        {name: 'Pujehun Government Hospital', uid: 's5ENsJuPvpg'},
        {name: 'Pujehun Static CHC', uid: 'P2B69vqfmxa'},
        {name: 'Salima Samba MCHP', uid: 'fU2KVlnGTZX'},
        {name: 'Sawula MCHP', uid: 'bplCwW6SjUc'},
        {name: 'Sorbeh Grima MCHP', uid: 'UAwYzKlBK0E'},
        {name: 'Taninahun Makemuma MCHP', uid: 'wQMG1rTATWt'},
        {name: 'Tongay MCHP', uid: 'cB061zWUDXv'},
        {name: 'Vawahun Kayimba MCHP', uid: 'pRXiahZiM40'}
    ],
    'Kpanga Krim Chiefdom': [
        {name: 'Bayama MCHP', uid: 'CUfQncws5Ud'},
        {name: 'Borborbu MCHP', uid: 'W8Xzf1rTKzT'},
        {name: 'Gobaru CHC', uid: 't4q26ZD7SVl'},
        {name: 'Vaama (Kpanga Krim) MCHP', uid: 'nhvmPdYeoPn'}
    ],
    'Makpele Chiefdom': [
        {name: 'Dumagbe MCHP', uid: 'G7wM7QVvS8d'},
        {name: 'Gbaa (Makpele) CHP', uid: 'KNpzoeFA2EU'},
        {name: 'Gbahama (Makpele) MCHP', uid: 'nOVDCt1XBZW'},
        {name: 'Gissiwolo MCHP', uid: 'GnYxwvcZRpD'},
        {name: 'Gofor CHP', uid: 'K58yvJ4lRbW'},
        {name: 'Ndombu MCHP', uid: 'zX1No0QMgIJ'},
        {name: 'Pewa MCHP', uid: 'sV6OY2OosjF'},
        {name: 'Zimmi CHC', uid: 'OUYLNjlVh4I'}
    ],
    'Malen Chiefdom': [
        {name: 'Bendu (Malen) MCHP', uid: 'ODnJykZrHpb'},
        {name: 'Hongai CHP', uid: 'ZaROqAYis7T'},
        {name: 'Jao (Malen) MCHP', uid: 'jDsXJ6P1qOg'},
        {name: 'Ngandorhun MCHP', uid: 'yMOcEY5mgDG'},
        {name: 'Nianyahun MCHP', uid: 'X2mkAbwo1qM'},
        {name: 'Nyandehun (Malen) MCHP', uid: 'QAnWXN75i98'},
        {name: 'Sahn (Malen) CHC', uid: 'qwF3rNOGvcF'},
        {name: 'Sengema (Malen) CHP', uid: 'znTHynBmevB'},
        {name: 'Taninahun (Malen) CHP', uid: 'xuHkxQnlQA2'}
    ],
    'Mano Sakrim Chiefdom': [
        {name: 'Bengani MCHP', uid: 'TxXqh7Y5e1Q'},
        {name: 'Gombu MCHP', uid: 'k98x1SvFnWU'},
        {name: 'Kassay MCHP', uid: 'O7WrfXI1nXh'},
        {name: 'Mano Gbongema CHC', uid: 'eBMjqEci2uQ'},
        {name: 'Mende MSK MCHP', uid: 't1mtYkirYZX'},
        {name: 'Nyandehun (Mano Sakrim) MCHP', uid: 'LtWOymVnTgO'},
        {name: 'Senbengu MCHP', uid: 'QhTiJHXYO2x'}
    ],
    'Peje Chiefdom': [
        {name: 'Bongay MCHP', uid: 'drhvYkZKMYZ'},
        {name: 'Bumbeh MCHP', uid: 'FiXxcjvXaVM'},
        {name: 'Futa Pejeh CHC', uid: 'AWVRtkpsFJ8'},
        {name: 'Helebu Pejeh MCHP', uid: 'QI7eMPnP51S'},
        {name: 'Pejewa (Futa Peje) MCHP', uid: 'B8yefN9qEls'}
    ],
    'Perri Chiefdom': [
        {name: 'Blama Perri MCHP', uid: 'gVErPrrfSWW'},
        {name: 'Bomi MCHP', uid: 'VzUdt9HYxoE'},
        {name: 'Bumpeh (Perri) CHC', uid: 'lkoD10P0NDq'},
        {name: 'Falaba CHP', uid: 'LvgtbOznv64'},
        {name: 'Kowama (Perri) MCHP', uid: 'raSPOCgaCx5'},
        {name: 'Ngajubaoma/Missibu MCHP', uid: 'bZlbWwavadR'},
        {name: 'Saama Perri MCHP', uid: 'AXGTJ4cJaBu'}
    ],
    'Soro Gbeima Chiefdom': [
        {name: 'Fairo CHC', uid: 'TCa2U58UIPj'},
        {name: 'Fanima (Soro) CHP', uid: 'yd56mqK3qgA'},
        {name: 'Futa Golawoma MCHP', uid: 'yhT1lmQpgzK'},
        {name: 'Gondama Massaquoi MCHP', uid: 'fOUzROYFXB4'},
        {name: 'Jendema CHC', uid: 'NpQOWFsdR4T'},
        {name: 'Koijeh MCHP', uid: 'j1U9raUiUOL'},
        {name: 'Malema 1 MCHP', uid: 'LPAOChzKFKC'},
        {name: 'Malema 2 MCHP', uid: 'iIriwttJhFk'},
        {name: 'Navai MCHP', uid: 'uuG5VaXr9Gv'},
        {name: 'Sengama Soro MCHP', uid: 'ttyvGSNppGb'},
        {name: 'Sulima CHP', uid: 'GADYugWr63V'},
        {name: 'Tindor MCHP', uid: 'j0uj4kofmlz'},
        {name: 'Wai MCHP', uid: 'fvMYYPOgoxo'}
    ],
    'Sowa Chiefdom': [
        {name: 'Bandajuma Sowa CHC', uid: 'o9K8HbQLJ7G'},
        {name: 'Geoma Jarjoh CHP', uid: 'teWwA7D3KMq'},
        {name: 'Lower Komende MCHP', uid: 'TAAlwsM0CS4'},
        {name: 'Upper Komende MCHP', uid: 'sOaIriAT7O3'},
        {name: 'Vaawahun Sowa MCHP', uid: 'PK4hVZjC95g'}
    ],
    'Yakemoh Kpukumu Krim Chiefdom': [
        {name: 'Bangorma MCHP', uid: 'HRmRSqv4ntJ'},
        {name: 'Borma (Yakemu Kpukumu) MCHP', uid: 'OC0RRU9OtGn'},
        {name: 'Karlu CHC', uid: 'AvfrLgCTL1W'},
        {name: 'Kombeima MCHP', uid: 'V0F3IjCwdkw'},
        {name: 'Kombopi MCHP', uid: 'mIKQuSz8xDG'},
        {name: 'Messima MCHP', uid: 'OJ5v39nYjSM'},
        {name: 'Saama Sowunde MCHP', uid: 'vetiyW2boAi'}
    ],
    // ===== KAILAHUN DISTRICT =====
    'Dea Chiefdom': [],
    'Jahn Chiefdom': [],
    'Jawei Chiefdom': [],
    'Kissi Kama Chiefdom': [],
    'Kissi Teng Chiefdom': [],
    'Kissi Tongi Chiefdom': [],
    'Luawa Chiefdom': [],
    'Malema Chiefdom': [],
    'Mandu Chiefdom': [],
    'Njaluahun Chiefdom': [],
    'Peje Bongre Chiefdom': [],
    'Peje West Chiefdom': [],
    'Penguia Chiefdom': [],
    'Upper Bambara Chiefdom': [],
    'Yawei Chiefdom': [],
    // ===== KENEMA DISTRICT =====
    'Dama Chiefdom': [
        {name: 'Diamei MCHP', uid: 'ow3mtDhTz5C'},
        {name: 'Gao MCHP', uid: 'xmP3u5q0GjB'},
        {name: 'Giema (Dama) CHP', uid: 'Is0PFc56H6v'},
        {name: 'Konia (Dama) MCHP', uid: 'kZarTiVyj3P'},
        {name: 'Konjo (Dama) CHP', uid: 'WnuFR4nHs7T'},
        {name: 'Kpandebu CHC', uid: 'Y5xsQXAwm31'},
        {name: 'Lileima MCHP', uid: 'FiTCoWAWPni'},
        {name: 'Loppa CHP', uid: 'Drxsn6jhKS1'},
        {name: 'Majihun MCHP', uid: 'ijwphOe9ZG3'},
        {name: 'Patama MCHP', uid: 'I8O6dOxTylu'},
        {name: 'Tawahun MCHP', uid: 'rFrbzNTdF1R'},
        {name: 'Tokpombu (Dama) CHP', uid: 'EOcSrvqasov'}
    ],
    'Dodo Chiefdom': [
        {name: 'Dodo CHC', uid: 'r9ZEPz2yNUU'},
        {name: 'Guala MCHP', uid: 'zLSyvXxZMpb'},
        {name: 'Kundorma CHP', uid: 'VQlG2chUska'},
        {name: 'Mbowohun CHP', uid: 'tB9t0gbXOI7'}
    ],
    'Gaura Chiefdom': [
        {name: 'Joru CHC', uid: 'f0EypCBO8ud'},
        {name: 'Kokoru CHP', uid: 'Yzyqai8BL3Z'},
        {name: 'Mendekelema (Gaura) CHP', uid: 'HDieqft311e'},
        {name: 'Perrie MCHP', uid: 'cdka7NBuKU1'},
        {name: 'Sandaru (Gaura) MCHP', uid: 'A9FHPvMoD4U'},
        {name: 'Sembehun (Gaura) MCHP', uid: 'Hte87xnkhfn'},
        {name: 'Tikonko (Gaura) MCHP', uid: 'MJJg7lW1Cg1'},
        {name: 'Venima CHP', uid: 'YKDmsZMBJXR'}
    ],
    'Gorama Mende Chiefdom': [
        {name: 'Bambara Kaima CHP', uid: 'MOt6CC5Kz1u'},
        {name: 'Fomaya CHP', uid: 'TqPtTCcUkBo'},
        {name: 'Konta (Gorama Mende) CHP', uid: 'dOpVarh7dOY'},
        {name: 'Kortuhun (Gorama Mende) MCHP', uid: 'o9Muza3JWxM'},
        {name: 'Mondema CHC', uid: 'fQXsdCbxl2B'},
        {name: 'Ngiegboiye CHP', uid: 'ki4r7X81kf6'},
        {name: 'Njagbewema (Gorama Mende) MCHP', uid: 'L0RV5IfUuoX'},
        {name: 'Punduru CHP', uid: 'IxjPnzxKfwK'},
        {name: 'Tungie CHC', uid: 'VwSr5CcZUIe'}
    ],
    'Kandu Leppiama Chiefdom': [
        {name: 'Baoma Oil Mill CHC', uid: 'AvhxI9eRYWU'},
        {name: 'Diema MCHP', uid: 'pvOwnzvQ1iv'},
        {name: 'Gbado CHP', uid: 'Xnv972xj5Jp'},
        {name: 'Levuma (Kandu Leppiama) CHC', uid: 'V7XGc26TT7i'},
        {name: 'Sembehun (Kandu Leppiama) MCHP', uid: 'L9elBGgiNhV'}
    ],
    'Kenema City': [
        {name: 'African Muslim Agency Clinic', uid: 'wCFXJI0sK7W'},
        {name: 'Ahmadiyya Muslim (Nongowa) Hospital', uid: 'J39phbbgPTW'},
        {name: 'BL Services Clinic', uid: 'IbBGf6WSmK9'},
        {name: 'Burma 2 MCHP', uid: 'qRMsZxscmAB'},
        {name: 'Degbuama MCHP', uid: 'FgdT0bf461U'},
        {name: 'Direct Aid Orphanage (Kenema City) Clinic', uid: 'gAR2gH69VVn'},
        {name: 'Egyptian (Kenema City) Clinic', uid: 'PsW8Pd0jtJI'},
        {name: 'Ensah Foundation Clinic', uid: 'YGcLwjTrUEv'},
        {name: 'Friends For Lives Clinic', uid: 'Nnmo8K6CYDG'},
        {name: 'Gbo-Kakajama 1 MCHP', uid: 'mme1YqRfkIj'},
        {name: 'Gbo-Kakajama 2 MCHP', uid: 'fu57aQzgJe1'},
        {name: 'Gbo-Lambayama 1 CHC', uid: 'stBlhBQabwG'},
        {name: 'Gbo-Lambayama 2 MCHP', uid: 'CgFzJoH5kZ3'},
        {name: 'Kenema City Military Clinic', uid: 'R8FHeJ8iTup'},
        {name: 'Kenema Government Hospital', uid: 'qhHbIYNPSfd'},
        {name: 'Kenema Under Fives CHP', uid: 'W4kIVirADsZ'},
        {name: 'Kondebotihun MCHP', uid: 'NWf5RYlO0Lv'},
        {name: 'Koyagbema MCHP', uid: 'KKUJDT0F4jd'},
        {name: 'Kpayama 1 MCHP', uid: 'xjKhziYHET0'},
        {name: 'Kpayama 2 MCHP', uid: 'XEGZv8nzxNz'},
        {name: 'Kpetema (Kenema City) CHC', uid: 'ExAIrgMYEXC'},
        {name: 'Lango Town MCHP', uid: 'fQNt3AIbPhU'},
        {name: 'Malian Friendship Hospital', uid: 'SEwGOBcp44x'},
        {name: 'Marie Stopes (Kenema City) Clinic', uid: 'DCLBeLxQFWC'},
        {name: 'Nongowa Static MCHP', uid: 'ZNAKNTWL9Y5'},
        {name: 'Nyandeyama MCHP', uid: 'NGBaOznYTwp'},
        {name: 'Rainbow Clinic', uid: 'JiAzy6jkxeW'},
        {name: 'Red Cross (Kenema City) CHP', uid: 'JpJYfgGL3V5'},
        {name: 'Samai Town CHC', uid: 'yR2kpnLodok'},
        {name: 'Torkpombu MCHP', uid: 'R5VBAk1VW5h'}
    ],
    'Koya (Kenema) Chiefdom': [
        {name: 'Baoma (Koya) CHC', uid: 'T5zA0G4sCX7'},
        {name: 'Bongor (Koya) MCHP', uid: 't15PAiOZIYG'},
        {name: 'Jui (Koya) CHP', uid: 's5RHLztI6s5'},
        {name: 'Menima MCHP', uid: 'ieWXFUGoiJN'},
        {name: 'Njaluahun (Koya) MCHP', uid: 'NccleAqUtKo'},
        {name: 'Nyandehun (Koya) MCHP', uid: 'BPpluF7TLmw'},
        {name: 'Serabu (Koya) CHP', uid: 'MHXEOUsDoAP'}
    ],
    'Langroma Chiefdom': [
        {name: 'Woyama MCHP', uid: 'RzhtkqNBzeH'},
        {name: 'Yabaima CHP', uid: 'Hu6UzZClgNG'}
    ],
    'Lower Bambara Chiefdom': [
        {name: 'Bomie MCHP', uid: 'TuQCNqzX3Zw'},
        {name: 'Foindu (Lower Bambara) CHC', uid: 'WlGzE7izYuM'},
        {name: 'Foindu (Lower Bambara) CHP', uid: 'srC4XEvLGbx'},
        {name: 'Kamboma (Lower Bambara) CHC', uid: 'j6UVkCEMflc'},
        {name: 'Kamboma (Lower Bambara) MCHP', uid: 'Mlilb2xsjzq'},
        {name: 'Komende Getewalu CHP', uid: 'vmBdFic8UvD'},
        {name: 'Komende Luyema MCHP', uid: 'Yj5g2JRpKQ3'},
        {name: 'Konjo (Lower Bambara) CHC', uid: 'y9GoBDItucc'},
        {name: 'Konjo (Lower Bambara) MCHP', uid: 'ye6J3Xkz7FR'},
        {name: 'Kornia Kpindema CHP', uid: 'uVsQNlgcfsy'},
        {name: 'Kpandebu (Lower Bambara) CHC', uid: 's0vSnVRY6kR'},
        {name: 'Kpandebu (Lower Bambara) MCHP', uid: 'jOjUH8lspDT'},
        {name: 'Kpetema (Lower Bambara) CHP', uid: 'AoPAE0CkS10'},
        {name: 'Lowoma (Lower Bambara) CHC', uid: 'q5hF4ux4F25'},
        {name: 'Ngiehun (Lower Bambara) CHC', uid: 'JYplir4MQ5b'},
        {name: 'Njagbahun (Lower Bambara) MCHP', uid: 'hQeheTJib1y'},
        {name: 'Panguma CHC', uid: 'R7Zp9nPTPWE'},
        {name: 'Panguma Hospital', uid: 'aT2LS3XTGKf'},
        {name: 'Pelewahun (Lower Bambara) MCHP', uid: 'WJofClMWBTW'},
        {name: 'Saama CHP', uid: 'O8ibSSGmX6C'},
        {name: 'Sandeyiema MCHP', uid: 'FdtKbXIbujs'},
        {name: 'Sembiema MCHP', uid: 'kUJZYakIfR1'},
        {name: 'Semewabu MCHP', uid: 'MIzubQlFHSe'},
        {name: 'Tongo CHC', uid: 'QigcvPZqahA'},
        {name: 'Wiema CHC', uid: 'P0eUvysuIXS'}
    ],
    'Malegohun Chiefdom': [
        {name: 'Bendu (Malegohun) CHC', uid: 'qWPdGtaBfx1'},
        {name: 'Benduma (Malegohun) MCHP', uid: 'kXS5DQz8W8j'},
        {name: 'Helegombu MCHP', uid: 'dzXuRA5v2DC'},
        {name: 'Ngiehun Konjo CHP', uid: 'fFv0ZSCRGcy'}
    ],
    'Niawa Chiefdom': [
        {name: 'Bandawor MCHP', uid: 'RURPKNA3cnL'},
        {name: 'Gandorhun (Niawa) CHP', uid: 'lDUPzQqu85m'},
        {name: 'Sendumei CHC', uid: 'QVZsnXMgNyh'}
    ],
    'Nomo Chiefdom': [
        {name: 'Baoma (Nomo) CHP', uid: 'wet35964SA0'},
        {name: 'Damabara MCHP', uid: 'F0qOJmWvHK2'},
        {name: 'Faama CHC', uid: 'rfbULbcHklf'}
    ],
    'Nongowa Chiefdom': [
        {name: 'Bambawo MCHP', uid: 'AUi2S4qGz0m'},
        {name: 'Hangah CHC', uid: 'fbCul3cFaWS'},
        {name: 'Jormu (Nongowa) CHP', uid: 'sbjrpfQqwxZ'},
        {name: 'Komende (Nongowa) MCHP', uid: 'untfxCaJcHF'},
        {name: 'Konabu MCHP', uid: 'RkDYca48joh'},
        {name: 'Largo CHC', uid: 'jYkxcQTZz0D'},
        {name: 'Massahun MCHP', uid: 'CUq243yEJ7W'},
        {name: 'Medicins Sans Frontiere Hospital', uid: 'ld2hDMk2ysO'},
        {name: 'Ngelehun (Nongowa) MCHP', uid: 'SfkfF3Bwb6q'},
        {name: 'Niahun Buima MCHP', uid: 'I5bNzPwI0lA'},
        {name: 'Niekabu CHC', uid: 'lnUHkOMpnrT'},
        {name: 'Panderu MCHP', uid: 'qhcmpAzCiE6'},
        {name: 'Potehun MCHP', uid: 'kcII6FgHB1L'},
        {name: 'Talia (Nongowa) CHC', uid: 'bajzUc4wZEf'},
        {name: 'Vaahun MCHP', uid: 'JHwoR0G6H2w'}
    ],
    'Simbaru Chiefdom': [
        {name: 'Boajibu CHC', uid: 'S2SEYaGMdrQ'},
        {name: 'Gbageima MCHP', uid: 'XRO0sJLkyNf'}
    ],
    'Small Bo Chiefdom': [
        {name: 'Blama CHC', uid: 'Q6sgqrcHVxP'},
        {name: 'Doujo CHP', uid: 'yq55xDCDqul'},
        {name: 'Gelehun MCHP', uid: 'Is505EOJnt8'},
        {name: 'London (Blama) MCHP', uid: 'FkxhhbamXjj'},
        {name: 'Nyangbe-Bo MCHP', uid: 'Mct9iB1mp46'},
        {name: 'Sarabu CHP', uid: 'Ttbz3sJwz3Z'},
        {name: 'Tobanda CHC', uid: 'JWOsdhOJSv6'}
    ],
    'Tunkia Chiefdom': [
        {name: 'Belebu CHP', uid: 'CVxUqFTWKWx'},
        {name: 'Fayiema CHP', uid: 'tlYxXnq3qSV'},
        {name: 'Gbeworbu CHP', uid: 'JM7lp3vq1Mz'},
        {name: 'Gegbwema CHC', uid: 'piJAfGlX7Ls'},
        {name: 'Gorahun CHC', uid: 'ne7UlbAXVcu'},
        {name: 'Jao (Tunkia) CHP', uid: 'gDL3Ywv64Dy'},
        {name: 'Mano Ngiebla CHP', uid: 'kY0MMrme1rN'},
        {name: 'Ngiewahun CHP', uid: 'xtK4Tc3GaO6'},
        {name: 'Nyiemiga MCHP', uid: 'L01TQZKu3ro'},
        {name: 'Shenge MCHP', uid: 'ba0s8lZbPwe'}
    ],
    'Wandor Chiefdom': [
        {name: 'Baama CHC', uid: 'WmFc36CE8ij'},
        {name: 'Bambara MCHP', uid: 'R30mhbCwlMi'},
        {name: 'Faala CHP', uid: 'erCgYT1GNKf'},
        {name: 'Gendema MCHP', uid: 'ARFpFEYoy93'},
        {name: 'Kamboma (Wandor) MCHP', uid: 'mRXDFEvWo3e'}
    ],
    // ===== KONO DISTRICT =====
    'Fiama Chiefdom': [
        {name: 'Foindu (Fiama) CHC', uid: 'xPxWEa9V2mr'},
        {name: 'Kainkordu CHC', uid: 'bgHJNzRKcEr'},
        {name: 'Kangama (Fiama) CHP', uid: 'f5NKU6q6TJM'},
        {name: 'Katokola MCHP', uid: 'FkBdLcdmCMI'},
        {name: 'Kondewakoro MCHP', uid: 'hS2bUPQvKYo'},
        {name: 'Koroma MCHP', uid: 'w3WgwlBBqQp'},
        {name: 'Kurukoro MCHP', uid: 'YFgrURxzruq'},
        {name: 'Masofinia MCHP', uid: 'o7W1lxfkqBg'},
        {name: 'Sandor Yira MCHP', uid: 'gMZX2vFLkGR'},
        {name: 'Saquee Yira MCHP', uid: 'zP1TP3JD6v4'},
        {name: 'Tombodu (Fiama) CHC', uid: 'OV5G3EM2sxA'}
    ],
    'Gbane Chiefdom': [
        {name: 'Baiwalla MCHP', uid: 'vZPuOPZBQio'},
        {name: 'Bandafayie CHC', uid: 'WxGPCKDrqnf'},
        {name: 'Baoma (Gbane) CHP', uid: 'WLqLWbEQMiB'},
        {name: 'Boia Yira MCHP', uid: 'KTzNh3fG4Gg'},
        {name: 'Dambadu Yira MCHP', uid: 'pq2WyB9zFXE'},
        {name: 'Gandorhun (Gbane) CHC', uid: 'j3pJo8qkQyc'},
        {name: 'Kayima (Gbane) CHC', uid: 'vCqNjwVXaGR'},
        {name: 'Kono MH Red Cross CHP', uid: 'IpMKSTlw4bL'},
        {name: 'Mefele MCHP', uid: 'KJ3VfVo8fKR'},
        {name: 'Njaiama MCHP', uid: 'ixh1VHk5exr'},
        {name: 'Parkadu Yira MCHP', uid: 'UlB26Bz55Gl'},
        {name: 'Penduma CHC', uid: 'jfkX6caTDnA'},
        {name: 'Sonkoya MCHP', uid: 'smgVVmRtJpP'},
        {name: 'Tissoh MCHP', uid: 'CsyF08TJvL9'},
        {name: 'Yardu (Gbane) CHP', uid: 'LfnHGPtcOmC'},
        {name: 'Yaryah MCHP', uid: 'rTNPVuwKhRg'}
    ],
    'Gbane Kandor Chiefdom': [
        {name: 'Jagbwema Fiama CHP', uid: 'IvNP2bZJ4sE'},
        {name: 'Kangama (Gbane Kandor) CHC', uid: 'K8h20uOPlBu'},
        {name: 'Kombayendeh MCHP', uid: 'VbhFGUfvW17'},
        {name: 'Kwidu MCHP', uid: 'QwSrdh24fAi'},
        {name: 'Wuima (Gbane Kandor) MCHP', uid: 'sKSXFxwjGfO'}
    ],
    'Gbense Chiefdom': [
        {name: 'Baiama (Gbense) CHP', uid: 'wSbVIKZZ3Qr'},
        {name: 'Bomie Cha CHP', uid: 'sZiLGPQtR4P'},
        {name: 'Jaiama (Gbense) CHC', uid: 'D6NOblDSPTm'},
        {name: 'Jagbwema Kono CHP', uid: 'MJn8c5YFNJB'},
        {name: 'Kondeya MCHP', uid: 'lKArmZTWN6E'},
        {name: 'Manjama Yagala MCHP', uid: 'PcSi6o1dJfr'},
        {name: 'Motema CHC', uid: 'WQEPjpDPbsW'},
        {name: 'Motema CHP', uid: 'R2qKhqkJcHD'},
        {name: 'Njagbahun Kono CHP', uid: 'lXqDT93qLzV'},
        {name: 'Simbakoro MCHP', uid: 'H5qd5PfPlKo'},
        {name: 'Yengema (Gbense) CHP', uid: 'FNLy0DXBQCq'}
    ],
    'Gorama Kono Chiefdom': [
        {name: 'Kwagbadu CHP', uid: 'ZQJDvHJoLjv'},
        {name: 'Kwama (Gorama Kono) CHC', uid: 'UbpjwS5ANWa'},
        {name: 'Nemesor CHP', uid: 'Zp6EFzL2cJ9'},
        {name: 'Niakpandohun MCHP', uid: 'bJsShOI6N7P'},
        {name: 'Sahr (Gorama Kono) MCHP', uid: 'LhS2OBk6Laq'},
        {name: 'Seidu CHC', uid: 'nzBKBpZJO8q'},
        {name: 'Tefeya MCHP', uid: 'QoV4lkS7qU9'},
        {name: 'Wuima (Gorama Kono) CHP', uid: 'mIB2acT5mU5'}
    ],
    'Kamara Chiefdom': [
        {name: 'Bumpeh (Kamara) CHP', uid: 'cF1eIY8xW60'},
        {name: 'Kortihun (Kamara) MCHP', uid: 'tqwV1yWS8SV'},
        {name: 'Njaiama Sewafe CHC', uid: 'mH0aGNJYKBd'},
        {name: 'Yardu (Kamara) CHP', uid: 'YueLLCX9mNB'}
    ],
    'Koidu New Sembehun City': [
        {name: 'Calvary Hospital', uid: 'xBnICXepIJh'},
        {name: 'Combema Town MCHP', uid: 'eoiEFIBkGnY'},
        {name: 'Direct Aid (Koidu) Clinic', uid: 'lE6XY49VcIL'},
        {name: 'Giebu MCHP', uid: 'lCyxQkXhCQB'},
        {name: 'HB Macauley Clinic', uid: 'EKQbfEDyHHV'},
        {name: 'Jormu (Koidu) MCHP', uid: 'o9B3W97o5mf'},
        {name: 'Kaisamba Town MCHP', uid: 'OOTp86IyNQx'},
        {name: 'Koidu Government Hospital', uid: 'fwH9ipvXde9'},
        {name: 'Koidu New Sebehun Static CHC', uid: 'SYl1l2LSXPO'},
        {name: 'Koidu Under Five Clinic', uid: 'eN4xUPqcxsJ'},
        {name: 'Koidu-Tankoro Red Cross CHP', uid: 'zGwYWbdB6Ol'},
        {name: 'Limestone CHC', uid: 'bT7UpWLJb2W'},
        {name: 'Marie Stopes (Koidu) Clinic', uid: 'Gk1gAEq1hS9'},
        {name: 'Nembema Town MCHP', uid: 'gBwQMIcUySf'},
        {name: 'New Site MCHP', uid: 'wQIKlLljjl9'},
        {name: 'Samai CHP', uid: 'K1vY4aY61SH'},
        {name: 'Samai Court Barrie MCHP', uid: 'PbWHlJOu7G1'},
        {name: 'Sandoh CHP', uid: 'YkglLQR2OOz'},
        {name: 'Sukudu Town MCHP', uid: 'SvA0Wv4MJhL'},
        {name: 'Tongbani MCHP', uid: 'HBYBiJhTtgw'},
        {name: 'W/W Clinic', uid: 'OL4fEcuJWu1'}
    ],
    'Lei Chiefdom': [
        {name: 'Gbandawolo MCHP', uid: 'VJzaA9Z5XYL'},
        {name: 'Hodo CHP', uid: 'Fa1f8lPxeqU'},
        {name: 'Kamawuya MCHP', uid: 'xCWEEU0d1c9'},
        {name: 'Lei MCHP', uid: 'q8c5uWLBBSg'},
        {name: 'Pobabu MCHP', uid: 'WF6A6j81NrY'},
        {name: 'Titiema MCHP', uid: 'LYgRAIr0lEj'},
        {name: 'Tumbodu CHC', uid: 'DJCzZ6wy6P5'},
        {name: 'Wuima (Lei) MCHP', uid: 'nxNwjuDaRu7'}
    ],
    'Mafindor Chiefdom': [
        {name: 'Bendu (Mafindor) MCHP', uid: 'Pd4gPd3aCdJ'},
        {name: 'Masoyila CHC', uid: 'KxjVTkw2I2s'},
        {name: 'Woama CHP', uid: 'fCHkXAiZbH1'},
        {name: 'Worodu MCHP', uid: 'S5P9EXwYMOe'}
    ],
    'Nimikoro Chiefdom': [
        {name: 'Giema (Nimikoro) CHC', uid: 'nY2k5P1LkLp'},
        {name: 'Gieya MCHP', uid: 'a2yClXC2IOn'},
        {name: 'Kania MCHP', uid: 'VWELt4CJQZL'},
        {name: 'Konema MCHP', uid: 'wG2nTSEcl0D'},
        {name: 'Ndowuma MCHP', uid: 'eMBGXZEv5lU'},
        {name: 'Njaima MCHP', uid: 'cZVLnO3cCeG'},
        {name: 'Sefadu (Nimikoro) CHP', uid: 'sxPPTlEkOes'},
        {name: 'Tombabu CHP', uid: 'vVGHILYD0xO'},
        {name: 'Yomatih MCHP', uid: 'BnmKJ6KlZEd'}
    ],
    'Nimiyama Chiefdom': [
        {name: 'Baiama (Nimiyama) CHC', uid: 'hy0qMYLJWNp'},
        {name: 'Gbokpoma MCHP', uid: 'p1JiEDpQHq7'},
        {name: 'Koardu MCHP', uid: 'fADt0YXUHSH'},
        {name: 'Nemedu CHP', uid: 'JxfPWuqh9Nm'},
        {name: 'Punduru Pampadu CHP', uid: 'UcFdKtEVNDG'},
        {name: 'Sewafe CHP', uid: 'p3I2mcBkwvX'},
        {name: 'Tobagodu CHC', uid: 'rV2yRfaKVvR'},
        {name: 'Yengema (Nimiyama) CHP', uid: 'G6pwn6e5hAM'}
    ],
    'Sandor Chiefdom': [
        {name: 'Balia MCHP', uid: 'Y5HJdaVFwoj'},
        {name: 'Koardu (Sandor) CHP', uid: 'MeXHxclxQPj'},
        {name: 'Koeyor Daama MCHP', uid: 'T6hghxdqk5s'},
        {name: 'Koeyor Sandor MCHP', uid: 'YBPO9E2V8mw'},
        {name: 'Tambiama CHP', uid: 'QMGJmPBQ2Xs'},
        {name: 'Yardu (Sandor) CHC', uid: 'sCDOLNzSVBb'},
        {name: 'Yardu Dambala MCHP', uid: 'hhfJWEH99Yn'}
    ],
    'Soa Chiefdom': [
        {name: 'Baima (Soa) MCHP', uid: 'b2nzH6LB5vl'},
        {name: 'Fanima (Soa) CHC', uid: 'MkuO2NW1WGa'},
        {name: 'Komboma MCHP', uid: 'JlmWVFYQIq2'},
        {name: 'Kulaya CHP', uid: 'ZL6tHRMn7Z0'},
        {name: 'Njaiama (Soa) CHP', uid: 'IpBrVFwIGRZ'},
        {name: 'Soa CHP', uid: 'mBz9FGzNAJv'},
        {name: 'Sokuyor MCHP', uid: 'D0Fl19xqxD7'}
    ],
    'Tankoro Chiefdom': [
        {name: 'Fadugu (Tankoro) MCHP', uid: 'F5JujYu6IBC'},
        {name: 'Kamadu CHP', uid: 'apZ8vN7eRl1'},
        {name: 'Kayima (Tankoro) CHC', uid: 'TrUWQrAKl9I'},
        {name: 'Tongoma CHC', uid: 'N2tF7eE2w8t'},
        {name: 'Yormandu CHC', uid: 'dz6LVk0Bpus'}
    ],
    'Toli Chiefdom': [
        {name: 'Masingbi CHC', uid: 'C1T2SdJqPBg'},
        {name: 'Torma Bum (Toli) MCHP', uid: 'w6HE3E6P6L9'}
    ],
    // ===== KONO DISTRICT =====
    'Fiama Chiefdom': [
        {name: 'Jagbwema (Fiama) CHC', uid: 'CqJbsnfJcBt'},
        {name: 'Masundu CHP', uid: 'fCVhMAFHLCj'},
        {name: 'Yormandu CHC', uid: 'rqvNSCNKd50'}
    ],
    'Gbane Chiefdom': [
        {name: 'Baimbawuru MCHP', uid: 'pWj6bI2pHFY'},
        {name: 'Bumpeh (Gbane) CHP', uid: 'J0I8UZ8AO5r'},
        {name: 'Kondewakoro CHP', uid: 'WqKvxIMXHuB'},
        {name: 'Yardu Sunkia CHP', uid: 'HjdDYH61ZBu'}
    ],
    'Gbane Kandor Chiefdom': [
        {name: 'Kayima CHC', uid: 'xGJCkJvyRZL'},
        {name: 'Kondeya CHP', uid: 'HJ0TF3s8qJI'},
        {name: 'Masodu MCHP', uid: 'V1K8I2jZmXb'},
        {name: 'Tefeya CHP', uid: 'V0TXNHxMYWH'}
    ],
    'Gbense Chiefdom': [
        {name: 'Gandorhun (Gbense) CHC', uid: 'NxBVNXpIRzF'},
        {name: 'Jagbwema (Gbense) MCHP', uid: 'sHlhg4J1f35'},
        {name: 'Njaiama Nimikoro CHC', uid: 'bCuhNtvByeo'},
        {name: 'Tombodu CHC', uid: 'L1LHK3pPYAE'}
    ],
    'Gorama Kono Chiefdom': [
        {name: 'Gbangadu CHP', uid: 'GzTLxDOOaOd'},
        {name: 'Konomanyi CHP', uid: 'VaILHQjAOMh'},
        {name: 'Kwidu MCHP', uid: 'FTdMvhNZAhf'},
        {name: 'Tumbodu CHP', uid: 'RFcKQe7epNe'},
        {name: 'Upper Sami MCHP', uid: 'OQQVb8Loj7n'},
        {name: 'Yabaima MCHP', uid: 'QTKpjPvwf8D'}
    ],
    'Kamara Chiefdom': [
        {name: 'Fokoniah MCHP', uid: 'u4lHddJZKcS'},
        {name: 'Meyema CHP', uid: 'nfDUjYdZddq'},
        {name: 'Ndesedu MCHP', uid: 'SdJ9o6bDmqj'},
        {name: 'Sewafe CHC', uid: 'lJOcYeSZ8QC'},
        {name: 'Wordu CHC', uid: 'yl4jhigcXgB'}
    ],
    'Koidu New Sembehun City': [
        {name: 'Bomboafuidu CHP', uid: 'f0xg7KpMPn7'},
        {name: 'Cyborg Hospital', uid: 'bvRvxCvN5hB'},
        {name: 'Hill Station CHP', uid: 'QgG5lU6LwSL'},
        {name: 'Kainkordu CHC', uid: 'mUuCTfbGEpJ'},
        {name: 'Koidu Government Hospital', uid: 'E8FwuPsMC8g'},
        {name: 'Koidu New Sembehun City CHC', uid: 'YPIzH0d4aSV'},
        {name: 'Koidu Under Fives CHP', uid: 'z58kcVZt2kP'},
        {name: 'Kwakoyima CHC', uid: 'K8vvQcBLYJm'},
        {name: 'Lebanon MCHP', uid: 'MtWJ9t4K81N'},
        {name: 'Moidiba CHC', uid: 'dUm43iSQ3Td'},
        {name: 'Motema CHC', uid: 'YNQW64Ai6G4'},
        {name: 'Red Cross (Koidu New Sembehun City) CHP', uid: 'n8nHYJNr2iS'},
        {name: 'Tankoro Static CHC', uid: 'ydDPE5ddmKP'},
        {name: 'Yaryah MCHP', uid: 'sGRcxKsXMuG'}
    ],
    'Lei Chiefdom': [
        {name: 'Bendu (Lei) CHP', uid: 'a6yjKS3xO5C'},
        {name: 'Bumbuna (Lei) MCHP', uid: 'Wr5MpDJMO0z'},
        {name: 'Foindu (Lei) CHC', uid: 'u88O8Gq1Fv9'},
        {name: 'Sendumei (Lei) CHP', uid: 'PPZVc5xJ79g'}
    ],
    'Mafindor Chiefdom': [
        {name: 'Koardu CHC', uid: 'GJzZVlXJW1c'},
        {name: 'Masseseh MCHP', uid: 'lAbMp1axmVd'},
        {name: 'Tissana (Mafindor) CHP', uid: 'wVXb6nGBdBM'}
    ],
    'Nimikoro Chiefdom': [
        {name: 'Badehun MCHP', uid: 'kJN20IHyNui'},
        {name: 'Bendukoro CHP', uid: 'H5Ygu9Qv6ZA'},
        {name: 'Kortuhun (Nimikoro) CHP', uid: 'OEAMBWfTXBg'},
        {name: 'Nimikoro Static CHC', uid: 'TQkAFdLMC61'},
        {name: 'Sukudu CHC', uid: 'xj91n66IKUp'},
        {name: 'Yengema (Nimikoro) CHC', uid: 'u0LKq9SpTBH'}
    ],
    'Nimiyama Chiefdom': [
        {name: 'Bumpe (Nimiyama) CHP', uid: 'OJJ6XKDR1Pz'},
        {name: 'Fefeh CHP', uid: 'vdnHqWe0fml'},
        {name: 'Sefadu MCHP', uid: 'mvtGBdZTlWb'},
        {name: 'Tongo Field CHC', uid: 'DfZvNVOA89c'}
    ],
    'Sandor Chiefdom': [
        {name: 'Boroma MCHP', uid: 'eeYx54tFNIp'},
        {name: 'Gbamandu MCHP', uid: 'Ip6PwYjNmh9'},
        {name: 'Gbema-Buedu CHP', uid: 'IYr8bxD6mzb'},
        {name: 'Kangama (Sandor) CHC', uid: 'U2aE9D6uP0E'},
        {name: 'Nyandehun (Sandor) CHP', uid: 'HxuCHiP5oBD'}
    ],
    'Soa Chiefdom': [
        {name: 'Giebu MCHP', uid: 'jYsQK12Y5PD'},
        {name: 'Manjama (Soa) CHC', uid: 'gLmYVpMllwv'},
        {name: 'Penduma CHP', uid: 'Koe5P4oNr4C'}
    ],
    'Tankoro Chiefdom': [
        {name: 'Baiima CHP', uid: 'M0gEapT4XfX'},
        {name: 'Bondeya CHP', uid: 'KYsrN8cBWs9'},
        {name: 'Peyima CHC', uid: 'LGiKMUg1zHt'}
    ],
    'Toli Chiefdom': [
        {name: 'Kamadu MCHP', uid: 'kNSyW6JbWFY'},
        {name: 'Tongoma CHC', uid: 'QjSkGiapYLp'}
    ],
    // ===== BOMBALI DISTRICT =====
    'Biriwa Chiefdom': [
        {name: 'Binkolo CHC', uid: 'OUOxJSyHNfW'},
        {name: 'Kagbo Chiefdom CHP', uid: 'CJdXFRRfV7z'},
        {name: 'Kagbo Thambia MCHP', uid: 'rDDuJq1cMVQ'},
        {name: 'Mabureh (Biriwa) MCHP', uid: 'wVSFQVW1hL6'},
        {name: 'Makali CHP', uid: 'wTWWPmTcYFc'},
        {name: 'Makonkorie MCHP', uid: 'IFEZ5SV1aTK'},
        {name: 'Mangay Loko CHP', uid: 'aRNpsMNX3pv'},
        {name: 'Mapaki CHP', uid: 'O2ynGNPFgAq'},
        {name: 'Mateboi MCHP', uid: 'E3JWzSpCIHR'},
        {name: 'Pate Bana MCHP', uid: 'BN2xHNkVdJN'},
        {name: 'Robat MCHP', uid: 'Lq8HqVJLlHj'},
        {name: 'Rogbin MCHP', uid: 'aIQFdKqrQ2T'},
        {name: 'Rothatha CHP', uid: 'JsNmOuShKV7'}
    ],
    'Bombali Sebora Chiefdom': [
        {name: 'Bomban CHP', uid: 'gACqLMICHuP'},
        {name: 'Foria CHC', uid: 'Vy4s6JWVwXk'},
        {name: 'Kathanta Yimboi CHP', uid: 'H4n0APWHIKJ'},
        {name: 'Kaworeh MCHP', uid: 'KDRKQTylPAh'},
        {name: 'Laminaya CHP', uid: 'UtTY09TnHDr'},
        {name: 'Loreto Clinic', uid: 'NbvaNKRvCn7'},
        {name: 'Madina (Bombali Sebora) CHP', uid: 'pVnJcOQ04K5'},
        {name: 'Magbenteh MCHP', uid: 'LDwA3MRYKcT'},
        {name: 'Marampa (Bombali Sebora) MCHP', uid: 'BLwSP3WLSfE'},
        {name: 'Masongbo CHP', uid: 'hJhnf2hFuSS'},
        {name: 'Petifu CHP', uid: 'G0gcuO64FJH'},
        {name: 'Peyima (Bombali Sebora) CHP', uid: 'ePZpMBzaFt3'},
        {name: 'Rogbaneh MCHP', uid: 'nt1gJh2Yfdb'},
        {name: 'Rokonta CHP', uid: 'LuHCJcGQaKA'},
        {name: 'Rosengbeh MCHP', uid: 'HdwNgDMqJ9c'},
        {name: 'Sendugu CHP', uid: 'GlqNsS3lPGn'},
        {name: 'Yeli CHC', uid: 'iJJzZZYzh2R'}
    ],
    'Bombali Serry Chiefdom': [
        {name: 'Bureh (Bombali Serry) MCHP', uid: 'w3vA1lbaxqy'},
        {name: 'Kagbo-Kholifa CHP', uid: 'B6AJRxVbKiP'},
        {name: 'Makarie Gbanti CHC', uid: 'xWHE9H4K4f8'},
        {name: 'Makontha CHP', uid: 'MpR2mKIX4oE'},
        {name: 'Mathoira CHP', uid: 'p8o0WGbTKt9'},
        {name: 'Mathoira MCHP', uid: 'z0hOjkxcUb9'},
        {name: 'Mayogbor MCHP', uid: 'Ue0mOXqORxR'},
        {name: 'Thamabankay CHP', uid: 'KslqD05cLGm'}
    ],
    'Gbanti (Bombali) Chiefdom': [
        {name: 'Mabai (Gbanti) CHP', uid: 'qzwblm0OkEH'},
        {name: 'Masumana CHP', uid: 'u8TIXh6o2np'}
    ],
    'Gbendembu Chiefdom': [
        {name: 'Gbendembu CHC', uid: 'w0GXjN34Cyn'},
        {name: 'Kamalo (Gbendembu) CHP', uid: 'LcGPMRFgb2H'},
        {name: 'Katonga MCHP', uid: 'KI49dxcLKtP'},
        {name: 'Panlap CHP', uid: 'iN0rBQNWBrQ'}
    ],
    'Kamaranka Chiefdom': [
        {name: 'Kamaranka CHC', uid: 'uJqafPIrb1q'},
        {name: 'Mandaha MCHP', uid: 'TK6fMcvPPKW'}
    ],
    'Magbaimba Ndohahun Chiefdom': [
        {name: 'Gbentu MCHP', uid: 'wwbKI3gYRLg'},
        {name: 'Kamabai CHC', uid: 'P1aU1TBkADX'},
        {name: 'Kasokira CHP', uid: 'WT23cdRIXy7'},
        {name: 'Kemongbo CHP', uid: 'wBVhitVZPcW'},
        {name: 'Madina (Magbaimba Ndohahun) MCHP', uid: 'B0CXthsgmIW'},
        {name: 'Makakura CHP', uid: 'rbfLNl3Cqph'},
        {name: 'Makama (Magbaimba Ndohahun) MCHP', uid: 'RK58DH2hb5o'},
        {name: 'Masanga Hospital', uid: 'pL8bSCVNq85'}
    ],
    'Makarie Chiefdom': [
        {name: 'Kamabaktha MCHP', uid: 'aXblAaO6VbW'},
        {name: 'Kamasondo (Makari) CHP', uid: 'nOEiKKLLVSx'},
        {name: 'Ropereh CHC', uid: 'KRIJthNF6eF'}
    ],
    'Makeni City': [
        {name: 'Ahmadiyya Muslim (Makeni City) Hospital', uid: 'TuAPB8H9qnC'},
        {name: 'Egyptian (Makeni City) Clinic', uid: 'MnJ4YDLqKdD'},
        {name: 'Holy Spirit Hospital', uid: 'nWiSvTp4Plg'},
        {name: 'Kings Medical Center Hospital', uid: 'UKGpvQ0oEoR'},
        {name: 'Loreto Maronka CHC', uid: 'aOr3Kw3ib8l'},
        {name: 'Magburaka Road CHC', uid: 'sYYZWLFjfXQ'},
        {name: 'Makama (Makeni City) CHC', uid: 'jUlrJMjr94i'},
        {name: 'Makeni Government Hospital', uid: 'bqJ4Xqz9q16'},
        {name: 'Makeni Municipal Council CHC', uid: 'yRRYNJDjhD7'},
        {name: 'Marie Stopes (Makeni City) Clinic', uid: 'c4pnO8xdHpM'},
        {name: 'Red Cross (Makeni City) CHP', uid: 'UbMD9YpPvkG'},
        {name: 'Teko CHC', uid: 'LUl5R5BnVkr'}
    ],
    'Mara Chiefdom': [
        {name: 'Karina CHC', uid: 'GXK5hfEuklz'},
        {name: 'Kortimaw CHP', uid: 'ZEgMLQJNHlQ'},
        {name: 'Makong CHC', uid: 'BhR2cnx4LSe'},
        {name: 'Sumbuyah MCHP', uid: 'EaXF5M8GU8r'}
    ],
    'Ngowahun Chiefdom': [
        {name: 'Bantoro CHP', uid: 'M2aGxNKP0k2'},
        {name: 'Bunga MCHP', uid: 'CnfSbOx6x5K'},
        {name: 'Dura Farm MCHP', uid: 'TKKmLDffA1i'},
        {name: 'Hunduwa CHP', uid: 'MbPGOqDYPsq'},
        {name: 'Kalangba CHC', uid: 'p1EqCkqq7ux'}
    ],
    'Paki Masabong Chiefdom': [
        {name: 'Kagbere CHP', uid: 'ePrG4T61F6q'},
        {name: 'Kania CHP', uid: 'WC9rkNFjnxf'},
        {name: 'Makeni BRAC MCHP', uid: 'GnIZp9KzFSt'},
        {name: 'Masabong MCHP', uid: 'T5Gyn3wW2Qx'},
        {name: 'Massingbi CHP', uid: 'XM2Y5DEkqIa'},
        {name: 'Rosint CHP', uid: 'Xh9L31FXRKf'}
    ],
    'Safroko Limba Chiefdom': [
        {name: 'Batkanu CHC', uid: 'hMzWxJI3lMu'},
        {name: 'Kamagbengbe CHP', uid: 'q0gJ2B8MpKy'},
        {name: 'Kawuya (Safroko Limba) MCHP', uid: 'sTJi62xHzJy'},
        {name: 'Maherie MCHP', uid: 'IaPJqaJGKv6'},
        {name: 'Mamanka CHP', uid: 'QcxEPnU5pPh'},
        {name: 'Mara MCHP', uid: 'vvHlmgvHaOa'},
        {name: 'Rogbin Road CHC', uid: 'bXNKVbZlQO2'}
    ],
    // ===== FALABA DISTRICT =====
    'Barawa Wollay Chiefdom': [
        {name: 'Bafodia CHP', uid: 'WMfhvLsJXJl'},
        {name: 'Kruto CHC', uid: 'gWG8t1cAPGg'},
        {name: 'Mongo CHC', uid: 'lXTThANZHlb'}
    ],
    'Delmandugu Chiefdom': [
        {name: 'Fintonia (Delmadugu) CHC', uid: 'gcsPzwHKBIG'},
        {name: 'Morikabu CHP', uid: 'vdIXiPk2Gwi'}
    ],
    'Dembelia-Sinkunia Chiefdom': [
        {name: 'Kabala (Dembelia Sinkunia) CHC', uid: 'Kh96EBMYbJo'},
        {name: 'Sinkunia CHC', uid: 'hX2HxKy59rX'}
    ],
    'Folosaba Dembelia Chiefdom': [
        {name: 'Falaba CHC', uid: 'vQFHH2l7R3a'},
        {name: 'Gberia Timbako CHC', uid: 'XiNQCnmqJHj'}
    ],
    'Folosaba Kamba Chiefdom': [
        {name: 'Heremakono CHC', uid: 'qKgUlcYSEO9'},
        {name: 'Musaia CHC', uid: 'bYHNqFiHfaK'}
    ],
    'Kabelia Chiefdom': [
        {name: 'Kamaron CHC', uid: 'BxfIEd0mcjO'},
        {name: 'Kondembaia (Kabelia) CHC', uid: 'xXQahZfBg7m'}
    ],
    'Kamadugu Yiraia Chiefdom': [
        {name: 'Badala MCHP', uid: 'YhVnWuUzh3D'},
        {name: 'Mansadu CHC', uid: 'A3wKZopdG0Y'}
    ],
    'Kulor Saradu Chiefdom': [
        {name: 'Bumban CHC', uid: 'z6FIHnCnP2B'},
        {name: 'Saradu MCHP', uid: 'D5SJWqdTMcK'}
    ],
    'Mongo Chiefdom': [
        {name: 'Fakainia MCHP', uid: 'fQVPVYUoJbk'},
        {name: 'Kagbo (Mongo) MCHP', uid: 'xdC0VY8riww'}
    ],
    'Morifindu Chiefdom': [
        {name: 'Kadulagba MCHP', uid: 'y7xQZRYcB2z'},
        {name: 'Morifindu CHC', uid: 'MUH8QTIAiIS'}
    ],
    'Neya Chiefdom': [
        {name: 'Dogolia MCHP', uid: 'C2s4l3kLW7E'},
        {name: 'Neya CHC', uid: 'rXK0Qfyb2lU'}
    ],
    'Nyedu Chiefdom': [
        {name: 'Bokurie MCHP', uid: 'QJQcdz1oMvH'},
        {name: 'Nyedu CHC', uid: 'DxnjKbRV6Uu'}
    ],
    'Sulima Chiefdom': [
        {name: 'Feredugu (Sulima) MCHP', uid: 'PHbLVJ8TKpj'},
        {name: 'Kayorka MCHP', uid: 'dVuygkLJgKx'},
        {name: 'Sulima (Falaba) CHC', uid: 'SHCI8lhHzWi'}
    ],
    // ===== KOINADUGU DISTRICT =====
    'Diang Chiefdom': [
        {name: 'Bendugu CHC', uid: 'VhQ0xGgfJPJ'},
        {name: 'Kamba MCHP', uid: 'EaFyhLlTFqC'},
        {name: 'Kemedugu MCHP', uid: 'o0CX1YQBDTJ'}
    ],
    'Gbonkorbor Kayaka Chiefdom': [
        {name: 'Alikalia CHC', uid: 'Ws0A6XuGxmP'},
        {name: 'Mansofinia CHC', uid: 'Xg4bJsHlcME'}
    ],
    'Kallian Chiefdom': [
        {name: 'Yana MCHP', uid: 'gE6ESmf1aTc'},
        {name: 'Yiffin CHC', uid: 'MnPzwY8xOkf'}
    ],
    'Kamukeh Chiefdom': [
        {name: 'Kamba CHC', uid: 'C8s2U3k3Dpf'},
        {name: 'Kamukeh CHP', uid: 'c0V3s5xMJCR'}
    ],
    'Kasunko Kakellay Chiefdom': [
        {name: 'Fadugu CHC', uid: 'Hla1t7t3bQU'},
        {name: 'Kondiadu CHP', uid: 'Ff3lLhHCLYW'},
        {name: 'Kurubonla MCHP', uid: 'IKDuhzWIH3I'}
    ],
    'Nieni Chiefdom': [
        {name: 'Diabiya MCHP', uid: 'VZKv5mvQQDU'},
        {name: 'Fofombaia MCHP', uid: 'RqwlJIEW3eC'},
        {name: 'Kabala Government Hospital', uid: 'VWwRPM6z6T1'},
        {name: 'Kabala Static CHC', uid: 'EjJauvRbkkw'},
        {name: 'Kamagbeneh MCHP', uid: 'rqiuFuTUqvD'},
        {name: 'Kamakwia CHC', uid: 'mhERIPIJNEe'},
        {name: 'Kaniyaka CHP', uid: 'NqH0lgN8xqJ'},
        {name: 'Lala MCHP', uid: 'F6bkHM2u3Ue'},
        {name: 'Sinkiro CHP', uid: 'K8Z7PGBNYEz'},
        {name: 'Sokola MCHP', uid: 'FjXVoTMqAuE'},
        {name: 'Yogomaia CHP', uid: 'P3tMYi4fpAZ'}
    ],
    'Sengbeh Chiefdom': [
        {name: 'Kayaka MCHP', uid: 'HVyqJNnVEEO'},
        {name: 'Kondembaia (Sengbeh) CHC', uid: 'yCwlJTqv0Aw'},
        {name: 'Kurukuray MCHP', uid: 'CunXQ3jkCzV'}
    ],
    'Thamiso Chiefdom': [
        {name: 'Firawa CHC', uid: 'rCzNfz6aJVH'},
        {name: 'Tintanya CHP', uid: 'xV9y30CxiYe'}
    ],
    'Wara Wara Bafodia Chiefdom': [
        {name: 'Bafodia CHC', uid: 'mABq2GJqaLa'},
        {name: 'Kakoia (Wara Wara Bafodia) CHP', uid: 'k1lmJEcuPOa'}
    ],
    'Wara Wara Yagala Chiefdom': [
        {name: 'Gbawuria CHC', uid: 'aQvJ4SFUUD3'},
        {name: 'Koinadugu CHP', uid: 'HkJ9vWaXCH0'},
        {name: 'Kumala MCHP', uid: 'b3Y67nOZLF2'},
        {name: 'Senekedugu CHP', uid: 'B8oPvD84YVh'},
        {name: 'Sinikoro CHC', uid: 'ue8HT3v0rnL'},
        {name: 'Yagala CHC', uid: 'Mve5dxHCdz0'}
    ],
    // ===== TONKOLILI DISTRICT =====
    'Dansogoia Chiefdom': [
        {name: 'Bauya (Dansogoia) MCHP', uid: 'MeDKYJkf95D'},
        {name: 'Kamaranka (Dansogoia) MCHP', uid: 'wTxhH7ZJX1s'},
        {name: 'Mange CHC', uid: 'BYYZCcJ2uQc'},
        {name: 'Mathinka CHP', uid: 'xUPzMVv0M9M'},
        {name: 'Ronietta MCHP', uid: 'wYJdYg6TJVu'}
    ],
    'Gbokolenken Masankong Chiefdom': [
        {name: 'Magburaka Government Hospital', uid: 'bLXUHwwPqY0'},
        {name: 'Magburaka Static CHC', uid: 'eIpFJXrEHnm'},
        {name: 'Makeni Road CHC', uid: 'w7Ip3Ir10wm'},
        {name: 'Marie Stopes (Magburaka) Clinic', uid: 'wIk1Lq15yAa'},
        {name: 'Red Cross (Magburaka) CHP', uid: 'q4v9e6yVHEe'}
    ],
    'Gbokolenken Mayeppoh Chiefdom': [
        {name: 'Kagbetaima MCHP', uid: 'tFohejG4gq5'},
        {name: 'Mabainkono MCHP', uid: 'XZL2aI3Nkfy'},
        {name: 'Magbass CHP', uid: 'Ae1P3lFIPMh'},
        {name: 'Mayeapoh MCHP', uid: 'Qr3OLIq7Jac'},
        {name: 'Rothombo MCHP', uid: 'Q6tTCpFyY8g'}
    ],
    'Gbokolenken Polie Chiefdom': [
        {name: 'Mamuntha CHP', uid: 'C6PuxrEHVqK'},
        {name: 'Matikor (Polie) CHP', uid: 'vPODsqo5P7r'},
        {name: 'Polie CHC', uid: 'DG3sFjNQ3Y0'},
        {name: 'Rokonta (Polie) CHC', uid: 'jmxvTPX2XZw'}
    ],
    'Gbokolenken Yele Chiefdom': [
        {name: 'Kurankoh MCHP', uid: 'SIghRvqSsay'},
        {name: 'Magbilliplah MCHP', uid: 'L92eSPKA8AW'},
        {name: 'Majoro MCHP', uid: 'MYO5q5yVLzq'},
        {name: 'Malema (Yele) MCHP', uid: 'bQzNjuQFe3s'},
        {name: 'Rokel (Yele) MCHP', uid: 'V7L3QmPMRlz'},
        {name: 'Yele CHC', uid: 'h9u3WlU1zVa'}
    ],
    'Kafe Chiefdom': [
        {name: 'Bumbuna (Kafe) CHC', uid: 'lUk4LL1s3Sd'},
        {name: 'Foria (Kafe) MCHP', uid: 'rAn8bTXCKQR'},
        {name: 'Karafay MCHP', uid: 'UqWi0cvWGYU'},
        {name: 'Katantha CHC', uid: 'Gz1dY3hE4oZ'},
        {name: 'Mabanseh MCHP', uid: 'RB3U9UKlrN0'},
        {name: 'Makali (Kafe) CHP', uid: 'uxaPp5bsivR'},
        {name: 'Masuba CHC', uid: 'ZSMIS7yIcJy'}
    ],
    'Kalantuba Chiefdom': [
        {name: 'Balankonko MCHP', uid: 'EgUnm0dTCPd'},
        {name: 'Kalantuba CHP', uid: 'DFYEHPiIdYb'},
        {name: 'Kumrabai Yoni MCHP', uid: 'g61mP5r15Mq'},
        {name: 'Makaiba CHP', uid: 'Bh9LdIpbvzq'},
        {name: 'Mayossoh CHC', uid: 'EXgpA3MexOL'},
        {name: 'Petbana MCHP', uid: 'xxrXPHEVZlM'}
    ],
    'Kholifa Mabang Chiefdom': [
        {name: 'Mabang CHC', uid: 'xGW4OZ9BEkD'},
        {name: 'Magbonkor MCHP', uid: 'c8y6Ag3WN7J'},
        {name: 'Petifu Junction CHP', uid: 'yjqjfY0QP3x'}
    ],
    'Kholifa Mamuntha Chiefdom': [
        {name: 'Mabintho MCHP', uid: 'K97swNbJXEb'},
        {name: 'Mamuntha CHC', uid: 'mJMzD9lJpNc'},
        {name: 'Mara (Kholifa Mamuntha) CHP', uid: 'GHEA59fOqMW'},
        {name: 'Massimera (Kholifa Mamuntha) CHP', uid: 'gMGhuFSPq1i'},
        {name: 'Mayaya MCHP', uid: 'Q6rYMAKDuYf'}
    ],
    'Kholifa Rowalla Chiefdom': [
        {name: 'Maforki (Kholifa Rowalla) CHP', uid: 'kTDdREOlO7J'},
        {name: 'Magbafth CHC', uid: 'SYTMqQR9gIR'},
        {name: 'Maron MCHP', uid: 'w7qbRZlg8TJ'},
        {name: 'Rowalla CHC', uid: 'TA2vNqR5KQ5'}
    ],
    'Kunike Barina Chiefdom': [
        {name: 'Barina CHC', uid: 'DdNYNsqjgVA'},
        {name: 'Kasasi CHP', uid: 'mL0nw9HJ1a9'},
        {name: 'Mabontor CHP', uid: 'dEqTq3g9EtZ'},
        {name: 'Maboto CHP', uid: 'xFQomN3L5f5'},
        {name: 'Makobo CHP', uid: 'gqt7wP0j5Uk'},
        {name: 'Masingbi CHC', uid: 'u4G8F1XK8jd'},
        {name: 'Mayombo MCHP', uid: 'kKxVEV3gLvr'},
        {name: 'Rogbom CHC', uid: 'Z0TFKfNxL4s'}
    ],
    'Kunike Fulawusu Chiefdom': [
        {name: 'Bumbuna CHP', uid: 'yMkNJwlnr4G'},
        {name: 'Kondato CHP', uid: 'njb4DvQmFWA'},
        {name: 'Kurubaina CHP', uid: 'kPJMYPY0NQu'},
        {name: 'Yele Bana MCHP', uid: 'W5o6xZe7Swg'}
    ],
    'Kunike Sanda Chiefdom': [
        {name: 'Foredugu (Kunike Sanda) CHP', uid: 'dVHLGLLEp1b'},
        {name: 'Kamakwie Road MCHP', uid: 'ZxmDCIZJlLq'},
        {name: 'Peletoko MCHP', uid: 'vN5HyIGLMXo'},
        {name: 'Sanda CHC', uid: 'z5PsEoELU12'},
        {name: 'Woreh Yeama CHC', uid: 'GjSyYTXwBJi'}
    ],
    'Malal Chiefdom': [
        {name: 'Batkanu (Malal) MCHP', uid: 'zXcjq5RJeGO'},
        {name: 'Foredugu (Malal) MCHP', uid: 'c8YXPJQSjuq'},
        {name: 'Kontokoro MCHP', uid: 'kbzSvkOQ1LM'},
        {name: 'Malal CHC', uid: 'vGMhXsXmrAo'},
        {name: 'Masankorie MCHP', uid: 'fhFG4e1E9Pz'}
    ],
    'Sambaya Bendugu Chiefdom': [
        {name: 'Bendugu (Sambaya) CHC', uid: 'UVrwPj1riyO'},
        {name: 'Kaponkie MCHP', uid: 'q5Kk9pIQhqp'},
        {name: 'Rogbere Junction CHC', uid: 'lWi9pLM5HER'},
        {name: 'Sambaya MCHP', uid: 'qd9IOG9WLBn'}
    ],
    'Simiria Chiefdom': [
        {name: 'Kamasuntha CHP', uid: 'gRqVLAoaQQJ'},
        {name: 'Masanga Leprosy Hospital', uid: 'svkqCttmDc0'},
        {name: 'Masimera (Simiria) CHP', uid: 'pIZWW1dmYQd'},
        {name: 'Songo (Simiria) CHP', uid: 'QNqH1Ld9lYz'}
    ],
    'Tane Chiefdom': [
        {name: 'Mamaka MCHP', uid: 'ZmYtpabQQf7'},
        {name: 'Matotoka CHC', uid: 'aaF5xhp1D87'},
        {name: 'Matotoka (Tane) CHP', uid: 'wH1hKK4pRqE'},
        {name: 'Mile 91 CHC', uid: 'JJJkprWBDAq'},
        {name: 'Robana MCHP', uid: 'MgBdxLKwUBi'},
        {name: 'Tane MCHP', uid: 'yK6FYfrPmPv'}
    ],
    'Yoni Mabanta Chiefdom': [
        {name: 'Banta MCHP', uid: 'GJnG3SYOiU3'},
        {name: 'Foredugu (Yoni Mabanta) CHC', uid: 'Ou6FclZeZO3'},
        {name: 'Mahera (Yoni Mabanta) CHP', uid: 'HHLHxeN6tYd'},
        {name: 'Makonkori MCHP', uid: 'pnqoxIqFJfH'},
        {name: 'Rokimbie MCHP', uid: 'cN1zzKyYEjA'}
    ],
    'Yoni Mamala Chiefdom': [
        {name: 'Mabai (Yoni Mamala) CHP', uid: 'RYD5zPSH91p'},
        {name: 'Mahera (Yoni Mamala) MCHP', uid: 'v6RK4bUyOnv'},
        {name: 'Mamalikie CHC', uid: 'hSkV3DJbMYS'},
        {name: 'Masoko CHP', uid: 'MKJjS6GCEe4'},
        {name: 'Maworoko MCHP', uid: 'weCLDqQfD1P'},
        {name: 'Robis MCHP', uid: 'Rv3lSqJPgzx'}
    ],
    // ===== KAMBIA DISTRICT =====
    'Bramaia Chiefdom': [
        {name: 'Bubuya CHC', uid: 'sEOqn6R9fCb'},
        {name: 'Kasiri CHC', uid: 'VBM6rANi2r8'},
        {name: 'Kukuna CHC', uid: 'ZGEBi6FQWGV'}
    ],
    'Dixon Chiefdom': [
        {name: 'Kambia Government Hospital', uid: 'h7kKX0HkrYu'},
        {name: 'Kambia Static CHC', uid: 'iswMfpYCf4M'}
    ],
    'Gbinleh Chiefdom': [
        {name: 'Gbinleh Dixon CHC', uid: 'bkpOqlJWfQk'},
        {name: 'Robaka CHP', uid: 'i5q8dq5yY9w'},
        {name: 'Rochain MCHP', uid: 'SRmZIFqKbrh'}
    ],
    'Konimaka Chiefdom': [],
    'Magbema Chiefdom': [
        {name: 'Rokulan CHC', uid: 'EUBXNPPTrTh'},
        {name: 'Tonko CHC', uid: 'xmFiNpCw52P'}
    ],
    'Mambolo Chiefdom': [
        {name: 'Mambolo CHC', uid: 'M0kx0FWdKWc'}
    ],
    'Masumgbala Chiefdom': [
        {name: 'Barmoi CHC', uid: 'lkIxdYwIf6K'},
        {name: 'Masumgbala CHC', uid: 'L2qQzgcOYVm'}
    ],
    'Munu Thalla Chiefdom': [],
    'Samu Chiefdom': [
        {name: 'Madina (Samu) CHC', uid: 'XkSiHMefKBa'},
        {name: 'Malekuray CHP', uid: 'A3qpnG1eFVW'},
        {name: 'Moribaya CHC', uid: 'GhDfAzKmw2n'},
        {name: 'Roseanda (Samu) CHC', uid: 'j8dUh1Ij5gD'}
    ],
    'Tonko Limba Chiefdom': [
        {name: 'Laya CHP', uid: 'VBD0aZEVFTr'},
        {name: 'Mange Bure CHC', uid: 'Vu16OGTqcLK'},
        {name: 'Mabenteh MCHP', uid: 'kOYiVuYRH8O'},
        {name: 'Mawula MCHP', uid: 'YYSi4oFW16d'},
        {name: 'Tawuya MCHP', uid: 'yfufkf3v3lV'}
    ],
    // ===== KARENE DISTRICT =====
    'Buya Chiefdom': [
        {name: 'Kabonka CHC', uid: 'MZvL3t0v2sZ'},
        {name: 'Sinaya CHP', uid: 'dv4YWBQ33ck'}
    ],
    'Dibia Chiefdom': [],
    'Gbanti (Karene) Chiefdom': [
        {name: 'Gbanti CHC', uid: 'koxFUPCLh6a'},
        {name: 'Kagbantama CHP', uid: 'EpJ5LoIUGhK'}
    ],
    'Gormbahun Chiefdom': [],
    'Mafonda Makerembay Chiefdom': [],
    'Romende Chiefdom': [
        {name: 'Kagbaneh CHC', uid: 'jD5chN4mXKY'},
        {name: 'Kambia CHC', uid: 'pL0sR2vJkTA'},
        {name: 'Kebiah CHC', uid: 'W2q5sOVcFb9'},
        {name: 'Romende CHC', uid: 'bJwkFl8RSVC'}
    ],
    'Safroko Chiefdom': [],
    'Sanda Loko Chiefdom': [
        {name: 'Kamakwie CHC', uid: 'x8MIPjjptXA'},
        {name: 'Kamakwie Government Hospital', uid: 'q4G5WQBH3LI'},
        {name: 'Kamasanda CHP', uid: 'UB3rvH4MVFD'}
    ],
    'Sanda Magbolonthor Chiefdom': [
        {name: 'Beri CHC', uid: 'RIj5kfLIJI2'},
        {name: 'Kawuya (Sanda Magbolonthor) CHC', uid: 'wv3nBY5MDRM'}
    ],
    'Sanda Tendaren Chiefdom': [
        {name: 'Bumbuna (Sanda Tendaren) MCHP', uid: 'QqPJcEzb2zL'},
        {name: 'Kamaranka (Sanda Tendaren) CHC', uid: 'XF6sILZfFUq'},
        {name: 'Tendaren CHC', uid: 'lnZ2ZiJMrDQ'}
    ],
    'Sella Limba Chiefdom': [
        {name: 'Dansogoia (Sella Limba) CHC', uid: 'JJ8Y6MBqMXH'},
        {name: 'Kanike CHP', uid: 'l5BQ6dWqXvf'},
        {name: 'Kathanta Bana CHC', uid: 'W2vBNNmPLX5'},
        {name: 'Kawuya (Sella Limba) CHC', uid: 'lGPgLYuUYWu'},
        {name: 'Madina (Sella Limba) CHC', uid: 'sZMJ8mUF5fq'},
        {name: 'Thambie CHP', uid: 'rEjPo7u0fD5'}
    ],
    'Tambaka Simibungie Chiefdom': [
        {name: 'Tambaka CHC', uid: 'VJu8bSFHqP1'}
    ],
    'Tambaka Yobangie Chiefdom': [
        {name: 'Kamalo (Tambaka Yobangie) CHC', uid: 'EuwPJyhKe93'},
        {name: 'Yobangie CHC', uid: 'a6yWnKI8K7z'}
    ],
    // ===== PORT LOKO DISTRICT =====
    'Bake-Loko Chiefdom': [
        {name: 'Katick CHC', uid: 'RsADWNpHJJY'},
        {name: 'Mabora MCHP', uid: 'zVslZOvTVSH'},
        {name: 'Robole CHC', uid: 'K0hEKh8aLOv'},
        {name: 'Wareh CHP', uid: 'Tf3W3qU2xYR'}
    ],
    'Bureh Chiefdom': [
        {name: 'Bureh Town CHP', uid: 'KW0a5UT4kxQ'},
        {name: 'Kagbanthama CHC', uid: 'f3y5LxNQx8z'},
        {name: 'Mahera (Bureh) MCHP', uid: 'mwN3xP3bYhW'},
        {name: 'Mokanji Town CHP', uid: 'Px7WUnL5H6u'},
        {name: 'Rofort MCHP', uid: 'ry4p9cz0rkD'}
    ],
    'Kaffu Bullom Chiefdom': [
        {name: 'Kabbia CHC', uid: 'lBaAh3DKLg1'},
        {name: 'Mamaiki CHC', uid: 'C8qy1eJkBIO'}
    ],
    'Kamasondo Chiefdom': [
        {name: 'Bendugu (Kamasondo) CHP', uid: 'lqjJFMBVvTl'},
        {name: 'Kamasondo CHC', uid: 'MxPYNUd6Lv8'},
        {name: 'Madina (Kamasondo) MCHP', uid: 'xrC3qMYl3Gc'},
        {name: 'Robis (Kamasondo) CHP', uid: 'Mb3U1r8o5rV'}
    ],
    'Kasseh Chiefdom': [],
    'Koya (Port Loko) Chiefdom': [
        {name: 'Gbinti CHC', uid: 'BGNT9fjbwMW'},
        {name: 'Kathirie MCHP', uid: 'tqP8I3slPQX'},
        {name: 'Konteh CHP', uid: 'f5y8L8nXnUn'},
        {name: 'Maconteh CHP', uid: 'U0OxX9DRMoL'},
        {name: 'Magbele CHC', uid: 'p4OwZ0Qbwwb'},
        {name: 'Makump MCHP', uid: 'VZ2sIg6n0TK'},
        {name: 'Robana (Koya) CHP', uid: 'W5dR5vXQKb9'},
        {name: 'Royema MCHP', uid: 'Vfmt48RNFCN'},
        {name: 'Sendugu (Koya) MCHP', uid: 'lAZ6x4M5HCj'}
    ],
    'Lokomasama Chiefdom': [
        {name: 'Kapr CHC', uid: 'W5G32Tj3fVY'},
        {name: 'Mahera (Lokomasama) CHC', uid: 'Ks3qJOSN6M7'},
        {name: 'Petifu Mayeppa CHP', uid: 'pZHq8deCFIH'}
    ],
    'Maconteh Chiefdom': [
        {name: 'Panlap (Maconteh) CHC', uid: 'aTlXkzA9LSQ'}
    ],
    'Maforki Chiefdom': [
        {name: 'Makalie (Maforki) CHP', uid: 'A0eBLkrJVcW'},
        {name: 'Matinka (Maforki) CHC', uid: 'tSCgMPFvXDK'},
        {name: 'Port Loko CHC', uid: 'OZsZCiCXqGR'},
        {name: 'Port Loko Government Hospital', uid: 'tcs6eECqCHi'},
        {name: 'Rogbere CHC', uid: 'Zf4Y8aJ8TJH'},
        {name: 'Shekeh CHP', uid: 'Gp1AvtqIDgF'},
        {name: 'Tagrin CHC', uid: 'a9OOB80v0OH'}
    ],
    'Makama Chiefdom': [
        {name: 'Futa CHP', uid: 'nLUL8R8v2ky'},
        {name: 'Kagbaran CHC', uid: 'AqbBq8rLEg4'},
        {name: 'Rosanda (Makama) MCHP', uid: 'NRaymQHwGJg'}
    ],
    'Marampa Chiefdom': [
        {name: 'African Minerals (Marampa) Hospital', uid: 'LWkGqBqpOzE'},
        {name: 'Lunsar CHC', uid: 'H8b7LWXGGQH'},
        {name: 'Lunsar Government Hospital', uid: 'KCY1EvlLWGD'},
        {name: 'Lunsar Red Cross CHP', uid: 'dZ1OoWs7jZQ'},
        {name: 'Marampa CHC', uid: 'aBo1UIXqJ2Y'},
        {name: 'Mawulli CHP', uid: 'XqaPvkFhXws'},
        {name: 'Tainkatopa MCHP', uid: 'ycLNxDfRGCC'}
    ],
    'Masimera Chiefdom': [
        {name: 'Masimera CHC', uid: 'w76Ik1Ns23O'},
        {name: 'Romarra MCHP', uid: 'HyTGfLyQXKr'}
    ],
    'Port Loko City': [
        {name: 'Falla CHP', uid: 'FLDG3fLlA71'},
        {name: 'Mena CHP', uid: 'yvCNYhQixiX'},
        {name: 'Musaia (Port Loko City) CHP', uid: 'rL4LZGU3CjD'}
    ],
    'Tainkatopa Chiefdom': [
        {name: 'Mamalikie (Tainkatopa) CHP', uid: 'rLOk8EWQVm5'},
        {name: 'Tainkatopa CHC', uid: 'Pb6GnKNwlHo'}
    ],
    // ===== WESTERN AREA RURAL DISTRICT =====
    'Koya Rural Zone': [
        {name: 'Hastings CHC', uid: 'OuK3NxDfeW5'},
        {name: 'Koya CHC', uid: 'V0tGNBXZo9K'},
        {name: 'Masiaka (Koya Rural) CHC', uid: 'D8vIYDuYuFV'},
        {name: 'Newton CHC', uid: 'qVaXyRQN3aQ'},
        {name: 'Ogoo Farm CHC', uid: 'zNWuKdR7t9S'}
    ],
    'Mountain Rural Zone': [
        {name: 'Bathurst (Mountain Rural) MCHP', uid: 'sCq5Qsc8FDF'},
        {name: 'Charlotte MCHP', uid: 'zEfU0lEIK9l'},
        {name: 'Gloucester MCHP', uid: 'b2l6VnxO3lW'},
        {name: 'Grafton CHC', uid: 'xR8rbYTH8Og'},
        {name: 'Guma Valley CHC', uid: 'XKdR8Y3gQa8'},
        {name: 'Leicester MCHP', uid: 'W9s8X5qHoNq'},
        {name: 'Regent CHC', uid: 'G8HnIwZ4nKC'}
    ],
    'Waterloo Rural Zone': [
        {name: 'Benguema Barracks Hospital', uid: 'SMZ9RYYJXE3'},
        {name: 'Jui Hospital', uid: 'jVvNITqPn60'},
        {name: 'Lakka CHC', uid: 'XGtEzSrq5K0'},
        {name: 'Military Hospital 34', uid: 'xBiRkqLsj3R'},
        {name: 'Rokel MCHP', uid: 'rV4dCZsZJTH'},
        {name: 'Tombo CHC', uid: 'MzM4i3A32TL'},
        {name: 'Waterloo CHC', uid: 'hzKCgiUVaJw'},
        {name: 'Yams Farm CHP', uid: 'N9aVvBFsVXf'}
    ],
    'York Rural Zone': [
        {name: 'Baw Baw MCHP', uid: 'Pcp2vSgqmkn'},
        {name: 'John Thorpe CHC', uid: 'VXRusmM0mZq'},
        {name: 'Kent MCHP', uid: 'Sq3kVgmAUmu'},
        {name: 'Mama Beach MCHP', uid: 'i2XKmqH5DJe'},
        {name: 'Ricketts MCHP', uid: 'lEPy1TZuL7p'},
        {name: 'Sussex MCHP', uid: 'Fp3bHkC9QXu'},
        {name: 'York CHC', uid: 'oQGCIGzwTvR'}
    ],
    // ===== WESTERN AREA URBAN DISTRICT =====
    'Central 1 Zone': [
        {name: 'Approved School CHP', uid: 'SX7XTpqHGNj'},
        {name: 'City Council (Central 1) CHC', uid: 'OMB3AEAWWCj'},
        {name: 'Connaught Hospital', uid: 'UljcamBVFMr'},
        {name: 'Don Bosco Clinic', uid: 'FQWX3dQGvgP'},
        {name: 'Falcon Bridge Clinic', uid: 'xWwjAZIUPFE'},
        {name: 'George Brook CHP', uid: 'h3m1cKKAFjX'},
        {name: 'Good Shepherd CHC', uid: 'Z8t8S8TyNEd'},
        {name: 'Grassfield CHP', uid: 'OPqnTJAyQfK'},
        {name: 'King Harman Road CHC', uid: 'Y9sS72Y7QrS'},
        {name: 'Magazine CHP', uid: 'q5kVBzB4P9g'},
        {name: 'New England Ville CHP', uid: 'nRRBXlc2swJ'},
        {name: 'Princess Christian Maternity Hospital', uid: 'eA7p3lOeSHt'},
        {name: 'Susan Bay CHP', uid: 'BzVqtuNjphS'},
        {name: 'Syke Street CHC', uid: 'aQqZvhz7SXj'},
        {name: 'UNICEF CHC', uid: 'HqKsoBqKsWh'}
    ],
    'Central 2 Zone': [
        {name: 'GOAL CHP', uid: 'FnSoKe2wQ59'},
        {name: 'Kingtom CHC', uid: 'xN8btzgfhFC'},
        {name: 'Kingtom Police Barrack MCHP', uid: 'bIDBZLwRdNZ'},
        {name: 'Kroo Bay CHC', uid: 'HhfmqfUIBJM'},
        {name: 'Murray Town Barracks CHC', uid: 'GmHDZgWENK2'},
        {name: 'Ola During Childrens Hospital', uid: 'gNJsZBIFiDJ'},
        {name: 'Tower Hill CHC', uid: 'TIDAIaB7bfq'},
        {name: 'Wellington CHC', uid: 'GzOouPwavNp'}
    ],
    'East 1 Zone': [
        {name: 'Allentown CHC', uid: 'iQHBNHqRfZJ'},
        {name: 'Fourah Bay CHP', uid: 'nIqfuCLGQgD'},
        {name: 'Kanikay CHP', uid: 'EoTvlTqr1Cd'},
        {name: 'Kissy Brook CHP', uid: 'WTv0Qc5uxJ4'},
        {name: 'Kissy Dockyards MCHP', uid: 'YN2JWmPrXHu'},
        {name: 'Kissy Mental Hospital', uid: 'M8X7X4J7S3D'},
        {name: 'Kissy UMC Hospital', uid: 'cXh2JNKMVup'},
        {name: 'Portee CHC', uid: 'yVCYkRH6XYD'},
        {name: 'Portee Rokupa Hospital', uid: 'HMdN5Dl8nWi'},
        {name: 'Rokupa Government Hospital', uid: 'lLG2jFLRIgM'}
    ],
    'East 2 Zone': [
        {name: 'Aberdeen CHC', uid: 'TfxKA7GXsrv'},
        {name: 'Brookfields CHC', uid: 'O6uvpzGd5pu'},
        {name: 'Choithram Hospital', uid: 'vKQCgc4wVsB'},
        {name: 'Circular Road CHP', uid: 'Mdb4pZO6Dg8'},
        {name: 'Hill Station CHP', uid: 'OQC3TpBvCoP'},
        {name: 'Juba Barracks Hospital', uid: 'yT5LhDKQwbK'},
        {name: 'Lumley Hospital', uid: 'R2nfmXHJf9Q'},
        {name: 'Marie Stopes (Aberdeen) Clinic', uid: 'Q2jRQnZvS2L'},
        {name: 'National Stadium CHC', uid: 'Uq8NJU8DTUZ'},
        {name: 'Sierra Leone-China Friendship Hospital', uid: 'KhLAR2vLMaA'},
        {name: 'Signal Hill CHC', uid: 'j8qSXrZptaL'},
        {name: 'Wilberforce CHC', uid: 'F8R7OdKFzxE'}
    ],
    'East 3 Zone': [
        {name: '34 Military Hospital', uid: 'r8s98C7dRXN'},
        {name: 'Blue Shield Hospital', uid: 'QA3V3TmBNJp'},
        {name: 'Bockarie Clinic', uid: 'pEEMVqhS2zs'},
        {name: 'Calaba Town CHC', uid: 'o7LwLEJC36Q'},
        {name: 'Campbell Town CHC', uid: 'uI8QAcqA8fP'},
        {name: 'CDC Hospital', uid: 'o6RSZC9YGQF'},
        {name: 'Grafton CHC', uid: 'MYcUJPzKmxj'},
        {name: 'Graystone CHC', uid: 'Kh1Uf5IwHW5'},
        {name: 'Macauley Street CHC', uid: 'yYdqSFnVPRD'},
        {name: 'Marie Stopes (Calaba Town) Clinic', uid: 'kR75bOFEuqS'},
        {name: 'Nursing Home CHC', uid: 'qAIzlTfEVuS'},
        {name: 'Old Military Hospital', uid: 'oMzD4nHfB9n'},
        {name: 'Rossenheim CHC', uid: 'P4xLfCR0tYq'},
        {name: 'Wellington CHP', uid: 'MdLDDIJF5pG'}
    ],
    'West 1 Zone': [
        {name: 'Allen Town CHC', uid: 'XRJW2R8vc7S'},
        {name: 'Bombali Street CHC', uid: 'yjV6p9hcMzR'},
        {name: 'George Brook CHC', uid: 'f3XkSCYWjqP'},
        {name: 'Kissy CHC', uid: 'KXK4kqO3zUA'},
        {name: 'Kissy Mess Mess CHC', uid: 'VHMkwgT5T8D'},
        {name: 'River No. 2 MCHP', uid: 'Av0F4rHKNxa'},
        {name: 'Shell CHP', uid: 'jbVG5VPR9K1'},
        {name: 'Thunder Hill CHC', uid: 'DMfcrYMCYfH'},
        {name: 'Waterloo Road CHC', uid: 'o9fHQdHiRFk'}
    ],
    'West 2 Zone': [
        {name: 'Bottom Mango CHC', uid: 'K3XrX7x7G4o'},
        {name: 'Freetown BRAC MCHP', uid: 'vAyIuDSYTRd'},
        {name: 'Kuntolor CHC', uid: 'XLkYhvtpeCW'},
        {name: 'Lumley CHC', uid: 'FDJsZQT0Y0w'},
        {name: 'Main Motor Road CHC', uid: 'FpjSz3Z7rRt'},
        {name: 'Ross Road CHP', uid: 'x8DSvQS3b9u'},
        {name: 'Samaria CHC', uid: 'aCFQX8FQ8E8'},
        {name: 'Waterloo New Site CHC', uid: 'n8xMcsBwGXv'}
    ],
    'West 3 Zone': [
        {name: 'Black Hall Road CHC', uid: 'LvX9V0spFPu'},
        {name: 'Congo Cross CHP', uid: 'Q8tNpAVDPJI'},
        {name: 'Congo Town CHC', uid: 'Mv2Tt2xJUqG'},
        {name: 'Goderich CHC', uid: 'ECPH9VVLGbT'},
        {name: 'Hamilton CHC', uid: 'pVSGCLkEijW'},
        {name: 'Marie Stopes (Freetown) Clinic', uid: 'wIBs0ItAMGv'},
        {name: 'Murray Town CHC', uid: 'I6Wgr9PNpK2'},
        {name: 'Pademba Road CHC', uid: 'xtT7m5lGSRv'},
        {name: 'Tengbeh Town CHC', uid: 'bMAHLTXIVqQ'}
    ]
};

// ===== APPLICATION STATE =====
let currentSection = 1;
let formData = {};
let isDraft = true;
let currentDraftId = null;
let isOnline = navigator.onLine;
let gpsCoordinates = null;
let facilityPhoto = null;
let supervisorSignatures = {};
let staffSignature = null;

// ===== DOM ELEMENTS =====
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
const supervisionForm = document.getElementById('supervisionForm');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const formStatusBadge = document.getElementById('formStatusBadge');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const draftCount = document.getElementById('draftCount');
const pendingCount = document.getElementById('pendingCount');
const notification = document.getElementById('notification');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    setupOnlineOfflineDetection();
    updateStatusDisplay();
    updateDraftCount();
    updatePendingCount();
    populateRegionDropdown();
    initializeSignaturePads();
    requestGPSCoordinates();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Region/District/Chiefdom/Facility cascading
    document.getElementById('region').addEventListener('change', handleRegionChange);
    document.getElementById('district').addEventListener('change', handleDistrictChange);
    document.getElementById('chiefdom').addEventListener('change', handleChiefdomChange);
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', handleNavigation);
    });
    
    // Control buttons
    document.getElementById('newFormBtn').addEventListener('click', startNewForm);
    document.getElementById('viewDraftsBtn').addEventListener('click', openDraftsModal);
    document.getElementById('viewAnalysisBtn').addEventListener('click', openAnalysisModal);
    
    // Photo capture
    document.getElementById('photoInput').addEventListener('change', handlePhotoCapture);
    document.getElementById('capturePhotoBtn').addEventListener('click', () => document.getElementById('photoInput').click());
    document.getElementById('deletePhotoBtn').addEventListener('click', deletePhoto);
    
    // GPS refresh
    document.getElementById('refreshGpsBtn').addEventListener('click', requestGPSCoordinates);
    
    // Conditional fields
    setupConditionalFields();
    
    // Form input changes for auto-save
    supervisionForm.addEventListener('change', debounce(autoSaveDraft, 2000));
    supervisionForm.addEventListener('input', debounce(autoSaveDraft, 5000));
}

// ===== LOGIN =====
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('loginError');
    
    if (username === CONFIG.LOGIN_USERNAME && password === CONFIG.LOGIN_PASSWORD) {
        loginContainer.style.display = 'none';
        mainContent.classList.add('show');
        showNotification('Login successful! Welcome to the Supervision Checklist.', 'success');
    } else {
        errorEl.textContent = 'Invalid username or password. Please try again.';
        errorEl.classList.add('show');
    }
}

// ===== CASCADING DROPDOWNS =====
function populateRegionDropdown() {
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = '<option value="">-- Select Region --</option>';
    
    Object.keys(REGION_DISTRICT_MAP).sort().forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

function handleRegionChange(e) {
    const region = e.target.value;
    const districtSelect = document.getElementById('district');
    const chiefdomSelect = document.getElementById('chiefdom');
    const facilitySelect = document.getElementById('facilityName');
    
    // Reset dependent dropdowns
    districtSelect.innerHTML = '<option value="">-- Select District --</option>';
    chiefdomSelect.innerHTML = '<option value="">-- Select Chiefdom --</option>';
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    
    document.getElementById('facilityId').value = '';
    
    if (region && REGION_DISTRICT_MAP[region]) {
        REGION_DISTRICT_MAP[region].forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function handleDistrictChange(e) {
    const district = e.target.value;
    const chiefdomSelect = document.getElementById('chiefdom');
    const facilitySelect = document.getElementById('facilityName');
    
    // Reset dependent dropdowns
    chiefdomSelect.innerHTML = '<option value="">-- Select Chiefdom --</option>';
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    document.getElementById('facilityId').value = '';
    
    if (district && DISTRICT_CHIEFDOM_MAP[district]) {
        DISTRICT_CHIEFDOM_MAP[district].forEach(chiefdom => {
            const option = document.createElement('option');
            option.value = chiefdom;
            option.textContent = chiefdom;
            chiefdomSelect.appendChild(option);
        });
    }
}

function handleChiefdomChange(e) {
    const chiefdom = e.target.value;
    const facilitySelect = document.getElementById('facilityName');
    
    // Reset facility dropdown
    facilitySelect.innerHTML = '<option value="">-- Select Health Facility --</option>';
    document.getElementById('facilityId').value = '';
    
    if (chiefdom && CHIEFDOM_FACILITY_MAP[chiefdom]) {
        CHIEFDOM_FACILITY_MAP[chiefdom].forEach(facility => {
            const option = document.createElement('option');
            option.value = facility.name;
            option.textContent = facility.name;
            option.dataset.uid = facility.uid;
            facilitySelect.appendChild(option);
        });
    }
    
    // Add event listener for facility selection
    facilitySelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption && selectedOption.dataset.uid) {
            document.getElementById('facilityId').value = selectedOption.dataset.uid;
        }
    });
}

// ===== NAVIGATION =====
function handleNavigation(e) {
    const action = e.target.dataset.action;
    
    switch(action) {
        case 'back':
            if (currentSection > 1) {
                goToSection(currentSection - 1);
            }
            break;
        case 'next':
            if (validateCurrentSection()) {
                if (currentSection < CONFIG.TOTAL_SECTIONS) {
                    goToSection(currentSection + 1);
                }
            }
            break;
        case 'draft':
            saveDraft();
            break;
        case 'finalize':
            finalizeForm();
            break;
        case 'submit':
            submitForm();
            break;
    }
}

function goToSection(sectionNum) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`section${sectionNum}`);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionNum;
        updateProgress();
        
        // Scroll to top of form
        document.querySelector('.form-content').scrollIntoView({ behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = (currentSection / CONFIG.TOTAL_SECTIONS) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Section ${currentSection} of ${CONFIG.TOTAL_SECTIONS}`;
    
    // Update form status badge
    if (isDraft) {
        formStatusBadge.textContent = 'DRAFT';
        formStatusBadge.className = 'draft';
    } else {
        formStatusBadge.textContent = 'FINALIZED';
        formStatusBadge.className = 'finalized';
    }
}

// ===== VALIDATION =====
function validateCurrentSection() {
    const currentSectionEl = document.getElementById(`section${currentSection}`);
    const requiredFields = currentSectionEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields before proceeding.', 'error');
    }
    
    return isValid;
}

function validateEntireForm() {
    let isValid = true;
    
    for (let i = 1; i <= CONFIG.TOTAL_SECTIONS; i++) {
        const sectionEl = document.getElementById(`section${i}`);
        const requiredFields = sectionEl.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });
    }
    
    return isValid;
}

// ===== FORM DATA COLLECTION =====
function collectFormData() {
    const formElements = supervisionForm.elements;
    const data = {
        timestamp: new Date().toISOString(),
        gpsCoordinates: gpsCoordinates,
        facilityPhoto: facilityPhoto,
        supervisorSignatures: supervisorSignatures,
        staffSignature: staffSignature,
        isDraft: isDraft,
        sections: {}
    };
    
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.name) {
            if (element.type === 'checkbox') {
                if (!data.sections[element.name]) {
                    data.sections[element.name] = [];
                }
                if (element.checked) {
                    data.sections[element.name].push(element.value);
                }
            } else if (element.type === 'radio') {
                if (element.checked) {
                    data.sections[element.name] = element.value;
                }
            } else {
                data.sections[element.name] = element.value;
            }
        }
    }
    
    return data;
}

function loadFormData(data) {
    if (!data) return;
    
    // Load GPS and photo
    gpsCoordinates = data.gpsCoordinates;
    facilityPhoto = data.facilityPhoto;
    supervisorSignatures = data.supervisorSignatures || {};
    staffSignature = data.staffSignature;
    isDraft = data.isDraft !== false;
    
    // Update GPS display
    if (gpsCoordinates) {
        document.getElementById('gpsLatitude').textContent = gpsCoordinates.latitude.toFixed(6);
        document.getElementById('gpsLongitude').textContent = gpsCoordinates.longitude.toFixed(6);
        document.getElementById('gpsAccuracy').textContent = gpsCoordinates.accuracy.toFixed(2);
    }
    
    // Update photo display
    if (facilityPhoto) {
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = facilityPhoto;
        photoPreview.classList.add('show');
        document.getElementById('deletePhotoBtn').classList.add('show');
    }
    
    // Load form fields
    if (data.sections) {
        Object.keys(data.sections).forEach(key => {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    const elements = document.querySelectorAll(`[name="${key}"]`);
                    elements.forEach(el => {
                        if (Array.isArray(data.sections[key])) {
                            el.checked = data.sections[key].includes(el.value);
                        } else {
                            el.checked = el.value === data.sections[key];
                        }
                    });
                } else {
                    element.value = data.sections[key];
                    // Trigger change event for cascading dropdowns
                    if (element.tagName === 'SELECT') {
                        element.dispatchEvent(new Event('change'));
                    }
                }
            }
        });
    }
    
    updateProgress();
}

// ===== DRAFT MANAGEMENT =====
function saveDraft() {
    openDraftNameModal();
}

function openDraftNameModal() {
    const modal = document.getElementById('draftNameModal');
    const input = document.getElementById('draftNameInput');
    
    // Generate default name
    const facilityName = document.getElementById('facilityName').value || 'Unnamed Facility';
    const date = new Date().toLocaleDateString();
    input.value = `${facilityName} - ${date}`;
    
    modal.classList.add('show');
    
    // Setup event listeners
    document.getElementById('saveDraftBtn').onclick = () => {
        const draftName = input.value.trim() || `Draft ${Date.now()}`;
        saveDraftWithName(draftName);
        modal.classList.remove('show');
    };
    
    document.getElementById('cancelDraftBtn').onclick = () => {
        modal.classList.remove('show');
    };
}

function saveDraftWithName(name) {
    const data = collectFormData();
    data.draftName = name;
    data.draftId = currentDraftId || `draft_${Date.now()}`;
    data.savedAt = new Date().toISOString();
    
    currentDraftId = data.draftId;
    
    // Get existing drafts
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    
    // Update or add draft
    const existingIndex = drafts.findIndex(d => d.draftId === data.draftId);
    if (existingIndex >= 0) {
        drafts[existingIndex] = data;
    } else {
        drafts.push(data);
    }
    
    localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(drafts));
    updateDraftCount();
    
    showNotification(`Draft "${name}" saved successfully!`, 'success');
}

function autoSaveDraft() {
    if (currentDraftId) {
        const data = collectFormData();
        data.draftName = data.sections.facilityName || 'Auto-saved Draft';
        data.draftId = currentDraftId;
        data.savedAt = new Date().toISOString();
        data.isAutoSave = true;
        
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const existingIndex = drafts.findIndex(d => d.draftId === data.draftId);
        if (existingIndex >= 0) {
            drafts[existingIndex] = data;
            localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(drafts));
        }
    }
}

function loadDraft(draftId) {
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    const draft = drafts.find(d => d.draftId === draftId);
    
    if (draft) {
        currentDraftId = draftId;
        loadFormData(draft);
        closeDraftsModal();
        goToSection(1);
        showNotification(`Draft "${draft.draftName}" loaded successfully!`, 'success');
    }
}

function deleteDraft(draftId) {
    if (confirm('Are you sure you want to delete this draft?')) {
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const filtered = drafts.filter(d => d.draftId !== draftId);
        localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
        updateDraftCount();
        renderDraftsList();
        showNotification('Draft deleted successfully!', 'success');
    }
}

function openDraftsModal() {
    const modal = document.getElementById('draftsModal');
    modal.classList.add('show');
    renderDraftsList();
    
    document.getElementById('closeDraftsModal').onclick = closeDraftsModal;
}

function closeDraftsModal() {
    document.getElementById('draftsModal').classList.remove('show');
}

function renderDraftsList() {
    const container = document.getElementById('draftsList');
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    
    if (drafts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #6c757d;">No drafts saved yet.</p>';
        return;
    }
    
    container.innerHTML = drafts.map(draft => `
        <div class="draft-item">
            <div class="draft-item-header">
                <div>
                    <div class="draft-item-name">${draft.draftName}</div>
                    <div class="draft-item-date">Saved: ${new Date(draft.savedAt).toLocaleString()}</div>
                </div>
            </div>
            <div class="draft-item-actions">
                <button class="draft-action-btn load" onclick="loadDraft('${draft.draftId}')">Load</button>
                <button class="draft-action-btn delete" onclick="deleteDraft('${draft.draftId}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateDraftCount() {
    const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
    draftCount.textContent = drafts.length;
}

// ===== FORM SUBMISSION =====
function finalizeForm() {
    if (!validateEntireForm()) {
        showNotification('Please complete all required fields before finalizing.', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to finalize this form? You will not be able to edit it after finalizing.')) {
        isDraft = false;
        updateProgress();
        showNotification('Form finalized! You can now submit it.', 'success');
    }
}

function submitForm() {
    if (isDraft) {
        showNotification('Please finalize the form before submitting.', 'warning');
        return;
    }
    
    const data = collectFormData();
    
    if (isOnline) {
        submitToServer(data);
    } else {
        saveForLaterSubmission(data);
    }
}

function submitToServer(data) {
    showNotification('Submitting form...', 'warning');
    
    fetch(CONFIG.SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Remove from drafts if it was a draft
        if (currentDraftId) {
            const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
            const filtered = drafts.filter(d => d.draftId !== currentDraftId);
            localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
            updateDraftCount();
        }
        
        showNotification('Form submitted successfully!', 'success');
        startNewForm();
    })
    .catch(error => {
        console.error('Submission error:', error);
        saveForLaterSubmission(data);
    });
}

function saveForLaterSubmission(data) {
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    data.pendingId = `pending_${Date.now()}`;
    pending.push(data);
    localStorage.setItem(CONFIG.STORAGE_KEY_PENDING, JSON.stringify(pending));
    updatePendingCount();
    
    // Remove from drafts if it was a draft
    if (currentDraftId) {
        const drafts = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_DRAFTS) || '[]');
        const filtered = drafts.filter(d => d.draftId !== currentDraftId);
        localStorage.setItem(CONFIG.STORAGE_KEY_DRAFTS, JSON.stringify(filtered));
        updateDraftCount();
    }
    
    showNotification('Form saved for submission when online.', 'warning');
    startNewForm();
}

function updatePendingCount() {
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    pendingCount.textContent = pending.length;
}

function syncPendingSubmissions() {
    if (!isOnline) return;
    
    const pending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
    if (pending.length === 0) return;
    
    pending.forEach((data, index) => {
        fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            const currentPending = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY_PENDING) || '[]');
            const filtered = currentPending.filter(d => d.pendingId !== data.pendingId);
            localStorage.setItem(CONFIG.STORAGE_KEY_PENDING, JSON.stringify(filtered));
            updatePendingCount();
        })
        .catch(error => {
            console.error('Sync error:', error);
        });
    });
}

// ===== NEW FORM =====
function startNewForm() {
    if (confirm('Start a new form? Any unsaved changes will be lost.')) {
        supervisionForm.reset();
        currentSection = 1;
        currentDraftId = null;
        isDraft = true;
        gpsCoordinates = null;
        facilityPhoto = null;
        supervisorSignatures = {};
        staffSignature = null;
        
        // Clear photo preview
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = '';
        photoPreview.classList.remove('show');
        document.getElementById('deletePhotoBtn').classList.remove('show');
        
        // Clear GPS display
        document.getElementById('gpsLatitude').textContent = '--';
        document.getElementById('gpsLongitude').textContent = '--';
        document.getElementById('gpsAccuracy').textContent = '--';
        
        // Clear signatures
        clearAllSignatures();
        
        // Go to first section
        goToSection(1);
        requestGPSCoordinates();
        
        showNotification('New form started!', 'success');
    }
}

// ===== GPS =====
function requestGPSCoordinates() {
    if (!navigator.geolocation) {
        showNotification('GPS is not supported by your browser.', 'error');
        return;
    }
    
    document.getElementById('gpsLatitude').textContent = 'Loading...';
    document.getElementById('gpsLongitude').textContent = 'Loading...';
    document.getElementById('gpsAccuracy').textContent = 'Loading...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            gpsCoordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                timestamp: new Date().toISOString()
            };
            
            document.getElementById('gpsLatitude').textContent = gpsCoordinates.latitude.toFixed(6);
            document.getElementById('gpsLongitude').textContent = gpsCoordinates.longitude.toFixed(6);
            document.getElementById('gpsAccuracy').textContent = gpsCoordinates.accuracy.toFixed(2) + ' m';
            
            showNotification('GPS coordinates captured!', 'success');
        },
        (error) => {
            document.getElementById('gpsLatitude').textContent = 'Error';
            document.getElementById('gpsLongitude').textContent = 'Error';
            document.getElementById('gpsAccuracy').textContent = 'Error';
            
            let errorMsg = 'Unable to get GPS coordinates.';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = 'GPS permission denied. Please enable location access.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMsg = 'GPS request timed out. Please try again.';
                    break;
            }
            showNotification(errorMsg, 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 60000
        }
    );
}

// ===== PHOTO CAPTURE =====
function handlePhotoCapture(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        facilityPhoto = event.target.result;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = facilityPhoto;
        photoPreview.classList.add('show');
        document.getElementById('deletePhotoBtn').classList.add('show');
        showNotification('Photo captured successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

function deletePhoto() {
    if (confirm('Delete this photo?')) {
        facilityPhoto = null;
        const photoPreview = document.getElementById('photoPreview');
        photoPreview.src = '';
        photoPreview.classList.remove('show');
        document.getElementById('deletePhotoBtn').classList.remove('show');
        document.getElementById('photoInput').value = '';
        showNotification('Photo deleted.', 'success');
    }
}

// ===== SIGNATURE PADS =====
function initializeSignaturePads() {
    // Initialize supervisor signature pads
    for (let i = 1; i <= 4; i++) {
        const canvas = document.getElementById(`supervisorSignature${i}`);
        if (canvas) {
            setupSignaturePad(canvas, `supervisor${i}`);
        }
    }
    
    // Initialize staff signature pad
    const staffCanvas = document.getElementById('staffSignature');
    if (staffCanvas) {
        setupSignaturePad(staffCanvas, 'staff');
    }
}

function setupSignaturePad(canvas, id) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        return { x, y };
    }
    
    function startDrawing(e) {
        isDrawing = true;
        const coords = getCoords(e);
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        
        const coords = getCoords(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }
    
    function stopDrawing() {
        if (isDrawing) {
            isDrawing = false;
            saveSignature(canvas, id);
        }
    }
    
    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
}

function saveSignature(canvas, id) {
    const dataUrl = canvas.toDataURL('image/png');
    if (id === 'staff') {
        staffSignature = dataUrl;
    } else {
        supervisorSignatures[id] = dataUrl;
    }
}

function clearSignature(canvasId, signatureId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    if (signatureId === 'staff') {
        staffSignature = null;
    } else {
        delete supervisorSignatures[signatureId];
    }
}

function clearAllSignatures() {
    for (let i = 1; i <= 4; i++) {
        const canvas = document.getElementById(`supervisorSignature${i}`);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    const staffCanvas = document.getElementById('staffSignature');
    if (staffCanvas) {
        const ctx = staffCanvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, staffCanvas.width, staffCanvas.height);
    }
    
    supervisorSignatures = {};
    staffSignature = null;
}

// ===== CONDITIONAL FIELDS =====
function setupConditionalFields() {
    // Example: Show additional field when "No" is selected
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const conditionalField = document.getElementById(`${this.name}Conditional`);
            if (conditionalField) {
                if (this.value === 'No' || this.value === 'no') {
                    conditionalField.classList.add('show');
                } else {
                    conditionalField.classList.remove('show');
                }
            }
        });
    });
}

// ===== ONLINE/OFFLINE DETECTION =====
function setupOnlineOfflineDetection() {
    window.addEventListener('online', () => {
        isOnline = true;
        updateStatusDisplay();
        syncPendingSubmissions();
        showNotification('You are now online!', 'success');
    });
    
    window.addEventListener('offline', () => {
        isOnline = false;
        updateStatusDisplay();
        showNotification('You are now offline. Data will be saved locally.', 'warning');
    });
}

function updateStatusDisplay() {
    if (isOnline) {
        statusIndicator.className = 'status-indicator online';
        statusText.textContent = 'ONLINE';
    } else {
        statusIndicator.className = 'status-indicator offline';
        statusText.textContent = 'OFFLINE';
    }
}

// ===== ANALYSIS MODAL =====
function openAnalysisModal() {
    const modal = document.getElementById('analysisModal');
    modal.classList.add('show');
    
    document.getElementById('closeAnalysisModal').onclick = () => {
        modal.classList.remove('show');
    };
    
    // Load analysis data (placeholder)
    document.getElementById('analysisBody').innerHTML = `
        <div class="analysis-loading">
            <p>Analysis feature coming soon!</p>
            <p>This will display charts and statistics from your submitted supervision data.</p>
        </div>
    `;
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== EXPOSE FUNCTIONS GLOBALLY =====
window.loadDraft = loadDraft;
window.deleteDraft = deleteDraft;
window.clearSignature = clearSignature;
