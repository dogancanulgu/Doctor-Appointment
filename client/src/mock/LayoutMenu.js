export const userMenu = [
  {
    name: 'Home',
    path: '/',
    icon: 'ri-home-line',
  },
  {
    name: 'Appointments',
    path: '/appointments',
    icon: 'ri-file-list-line',
  },
  {
    name: 'Apply Doctor',
    path: '/apply-doctor',
    icon: 'ri-hospital-line',
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: 'ri-file-chart-line',
  },
];

export const doctorMenu = (user) => {
  return [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line',
    },
    {
      name: 'Appointments',
      path: '/doctor/appointments',
      icon: 'ri-file-list-line',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'ri-user-line',
    },
  ];
};

export const adminMenu = [
  {
    name: 'Home',
    path: '/',
    icon: 'ri-home-line',
  },
  {
    name: 'Users',
    path: '/admin/userslist',
    icon: 'ri-user-line',
  },
  {
    name: 'Doctors',
    path: '/admin/doctorslist',
    icon: 'ri-user-star-line',
  },
];

export const listOfClinics = [
  {
    label: 'Family Medicine',
    value: 'family_medicine',
  },
  {
    label: 'Algology',
    value: 'algology',
  },
  {
    label: 'Alcohol and Drug Addiction',
    value: 'alcohol_and_drug_addiction',
  },
  {
    label: 'Anesthesiology and Reanimation',
    value: 'anesthesiology_and_reanimation',
  },
  {
    label: 'Brain and Nerve Surgery',
    value: 'brain_and_nerve_surgery',
  },
  {
    label: 'Surgical Oncology',
    value: 'surgical_oncology',
  },
  {
    label: 'Pediatric Surgery',
    value: 'pediatric_surgery',
  },
  {
    label: 'Pediatric Dentistry',
    value: 'pediatric_dentistry',
  },
  {
    label: 'Pediatric Endocrinology',
    value: 'pediatric_endocrinology',
  },
  {
    label: 'Pediatric Infectious Diseases',
    value: 'pediatric_infectious_diseases',
  },
  {
    label: 'Pediatric Gastroenterology',
    value: 'pediatric_gastroenterology',
  },
  {
    label: 'Pediatric Genetic Diseases',
    value: 'pediatric_genetic_diseases',
  },
  {
    label: 'Pediatric Chest Diseases',
    value: 'pediatric_chest_diseases',
  },
  {
    label: 'Pediatric Hematology and Oncology',
    value: 'pediatric_hematology_and_oncology',
  },
  {
    label: 'Pediatric Immunology and Allergy Diseases',
    value: 'pediatric_immunology_and_allergy_diseases',
  },
  {
    label: 'Pediatric Cardiovascular Surgery',
    value: 'pediatric_cardiovascular_surgery',
  },
  {
    label: 'Pediatric Cardiology',
    value: 'pediatric_cardiology',
  },
  {
    label: 'Pediatric Metabolic Diseases',
    value: 'pediatric_metabolic_diseases',
  },
  {
    label: 'Pediatric Nephrology',
    value: 'pediatric_nephrology',
  },
  {
    label: 'Pediatric Neurology',
    value: 'pediatric_neurology',
  },
  {
    label: 'Pediatric Rheumatology',
    value: 'pediatric_rheumatology',
  },
  {
    label: 'Child Health and Diseases',
    value: 'child_health_and_diseases',
  },
  {
    label: 'Pediatric Urology',
    value: 'pediatric_urology',
  },
  {
    label: 'Child and Adolescent Substance and Alcohol Dependence',
    value: 'child_and_adolescent_substance_and_alcohol_dependence',
  },
  {
    label: 'Child and Adolescent Mental Health and Diseases',
    value: 'child_and_adolescent_mental_health_and_diseases',
  },
  {
    label: 'Skin and Venereal Diseases (Dermatology)',
    value: 'skin_and_venereal_diseases_dermatology',
  },
  {
    label: 'Dentistry (General Dentistry)',
    value: 'dentistry_general_dentistry',
  },
  {
    label: 'Hand Surgery',
    value: 'hand_surgery',
  },
  {
    label: 'Endodontics',
    value: 'endodontics',
  },
  {
    label: 'Endocrinology and Metabolic Diseases',
    value: 'endocrinology_and_metabolic_diseases',
  },
  {
    label: 'Infectious Diseases and Clinical Microbiology',
    value: 'infectious_diseases_and_clinical_microbiology',
  },
  {
    label: 'Physical Medicine and Rehabilitation',
    value: 'physical_medicine_and_rehabilitation',
  },
  {
    label: 'Gastroenterology',
    value: 'gastroenterology',
  },
  {
    label: 'Gastroenterology Surgery',
    value: 'gastroenterology_surgery',
  },
  {
    label: 'Traditional Complementary Medicine Unit',
    value: 'traditional_complementary_medicine_unit',
  },
  {
    label: 'Developmental Pediatrics',
    value: 'developmental_pediatrics',
  },
  {
    label: 'General Surgery',
    value: 'general_surgery',
  },
  {
    label: 'Geriatrics',
    value: 'geriatrics',
  },
  {
    label: 'Thoracic Surgery',
    value: 'thoracic_surgery',
  },
  {
    label: 'Chest Diseases',
    value: 'chest_diseases',
  },
  {
    label: 'Eye Diseases',
    value: 'eye_diseases',
  },
  {
    label: 'Air and Space Medicine',
    value: 'air_and_space_medicine',
  },
  {
    label: 'Hematology',
    value: 'hematology',
  },
  {
    label: 'Internal Diseases (Internal Medicine)',
    value: 'internal_diseases_internal_medicine',
  },
  {
    label: 'Immunology and Allergy Diseases',
    value: 'immunology_and_allergy_diseases',
  },
  {
    label: 'Work and Occupational Diseases',
    value: 'work_and_occupational_diseases',
  },
  {
    label: 'Gynecologic Oncology Surgery',
    value: 'gynecologic_oncology_surgery',
  },
  {
    label: 'Gynecology and Obstetrics',
    value: 'gynecology_and_obstetrics',
  },
  {
    label: 'Cardiac Surgery',
    value: 'cardiac_surgery',
  },
  {
    label: 'Cardiology',
    value: 'cardiology',
  },
  {
    label: 'Clinical Neurophysiology',
    value: 'clinical_neurophysiology',
  },
  {
    label: 'Ear Nose Throat Disorders',
    value: 'ear_nose_throat_disorders',
  },
  {
    label: 'Nephrology',
    value: 'nephrology',
  },
  {
    label: 'Neonatology',
    value: 'neonatology',
  },
  {
    label: 'Neurology',
    value: 'neurology',
  },
  {
    label: 'Nuclear medicine',
    value: 'nuclear_medicine',
  },
  {
    label: 'Orthodontics',
    value: 'orthodontics',
  },
  {
    label: 'Orthopedics and Traumatology',
    value: 'orthopedics_and_traumatology',
  },
  {
    label: 'Perinatology',
    value: 'perinatology',
  },
  {
    label: 'Periodontology',
    value: 'periodontology',
  },
  {
    label: 'Plastic, Reconstructive and Aesthetic Surgery',
    value: 'plastic_reconstructive_and_aesthetic_surgery',
  },
  {
    label: 'Prosthetic Dentistry',
    value: 'prosthetic_dentistry',
  },
  {
    label: 'Radiation Oncology',
    value: 'radiation_oncology',
  },
  {
    label: 'Restorative Dentistry',
    value: 'restorative_dentistry',
  },
  {
    label: 'Rheumatology',
    value: 'rheumatology',
  },
  {
    label: 'Mental Health and Diseases (Psychiatry)',
    value: 'mental_health_and_diseases_psychiatry',
  },
  {
    label: 'Health Committee',
    value: 'health_committee',
  },
  {
    label: 'Health Committee ÇÖZGER(Special Needs Report for Children)',
    value: 'health_committee_zgerspecial_needs_report_for_children',
  },
  {
    label: 'Smoking Cessation Clinic',
    value: 'smoking_cessation_clinic',
  },
  {
    label: 'Sports Medicine',
    value: 'sports_medicine',
  },
  {
    label: 'Underwater Medicine and Hyperbaric Medicine',
    value: 'underwater_medicine_and_hyperbaric_medicine',
  },
  {
    label: 'Medical Ecology and Hydroclimatology',
    value: 'medical_ecology_and_hydroclimatology',
  },
  {
    label: 'Medical Genetics',
    value: 'medical_genetics',
  },
  {
    label: 'Medical Oncology',
    value: 'medical_oncology',
  },
  {
    label: 'Sleep Polyclinic',
    value: 'sleep_polyclinic',
  },
  {
    label: 'Urology',
    value: 'urology',
  },
  {
    label: 'Oral and Maxillofacial Surgery',
    value: 'oral_and_maxillofacial_surgery',
  },
  {
    label: 'Oral and Maxillofacial Radiology',
    value: 'oral_and_maxillofacial_radiology',
  },
  {
    label: 'Radiology',
    value: 'radiology',
  },
];
