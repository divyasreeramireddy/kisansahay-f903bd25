import { Leaf, Droplets, Sun, Bug, Landmark, Cloud, Brain, BarChart3, Shield, Sprout } from "lucide-react";

// Mock crop recommendation data
export const mockCrops = [
  { name: "Rice", confidence: 92, season: "Kharif", yield: "4.5 tons/ha", icon: "🌾" },
  { name: "Wheat", confidence: 87, season: "Rabi", yield: "3.8 tons/ha", icon: "🌾" },
  { name: "Cotton", confidence: 78, season: "Kharif", yield: "2.1 tons/ha", icon: "🌿" },
  { name: "Sugarcane", confidence: 74, season: "Annual", yield: "70 tons/ha", icon: "🎋" },
  { name: "Maize", confidence: 69, season: "Kharif", yield: "3.2 tons/ha", icon: "🌽" },
];

export const mockWeather = {
  current: { temp: 28, humidity: 65, wind: 12, condition: "Partly Cloudy", icon: "⛅" },
  forecast: [
    { day: "Mon", temp: 28, low: 22, condition: "Sunny", icon: "☀️" },
    { day: "Tue", temp: 30, low: 23, condition: "Sunny", icon: "☀️" },
    { day: "Wed", temp: 27, low: 21, condition: "Cloudy", icon: "☁️" },
    { day: "Thu", temp: 25, low: 20, condition: "Rain", icon: "🌧️" },
    { day: "Fri", temp: 26, low: 21, condition: "Rain", icon: "🌧️" },
    { day: "Sat", temp: 29, low: 22, condition: "Sunny", icon: "☀️" },
    { day: "Sun", temp: 31, low: 24, condition: "Hot", icon: "🔥" },
  ],
};

export const mockSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Crop Insurance",
    objective: "Provide financial support to farmers suffering crop loss/damage arising from unforeseen events.",
    eligibility: "All farmers growing notified crops in notified areas. Both loanee and non-loanee farmers.",
    benefits: "Insurance coverage for crop loss due to natural calamities, pests & diseases. Premium: 2% Kharif, 1.5% Rabi.",
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details", "Sowing Certificate"],
    applicationSteps: ["Visit nearest bank or CSC", "Fill application form", "Submit documents", "Pay premium", "Get policy document"],
    deadline: "July 31, 2025",
    link: "https://pmfby.gov.in",
    icon: "🛡️",
  },
  {
    id: 2,
    name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    category: "Irrigation",
    objective: "Ensure access to irrigation for every farm (Har Khet Ko Paani) and improve water use efficiency.",
    eligibility: "Farmers with cultivable land, water user associations, and farmer producer organizations.",
    benefits: "Subsidies up to 55% for small/marginal farmers for micro-irrigation systems. Drip and sprinkler systems covered.",
    documents: ["Land Ownership Proof", "Aadhaar Card", "Bank Details", "Caste Certificate (if applicable)"],
    applicationSteps: ["Apply online at pmksy.gov.in", "Submit documents to Block office", "Verification by officials", "Receive subsidy"],
    deadline: "Open throughout the year",
    link: "https://pmksy.gov.in",
    icon: "💧",
  },
  {
    id: 3,
    name: "Kisan Credit Card (KCC)",
    category: "Loan & Credit",
    objective: "Provide affordable credit to farmers for agriculture and allied activities.",
    eligibility: "All farmers, tenant farmers, sharecroppers, and self-help groups of farmers.",
    benefits: "Credit limit up to ₹3 lakhs at 4% interest. Crop insurance coverage included. ATM-enabled card.",
    documents: ["Identity Proof", "Address Proof", "Land Records", "Passport-size Photos", "Application Form"],
    applicationSteps: ["Visit any bank", "Fill KCC application", "Submit land papers", "Bank verification", "Card issued within 14 days"],
    deadline: "Open throughout the year",
    link: "https://www.pmkisan.gov.in",
    icon: "💳",
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    category: "Soil Health",
    objective: "Issue soil health cards to farmers carrying crop-wise recommendations of nutrients and fertilizers.",
    eligibility: "All farmers across India.",
    benefits: "Free soil testing, nutrient recommendations, improved soil health, reduced fertilizer costs by up to 30%.",
    documents: ["Aadhaar Card", "Land Details", "Mobile Number"],
    applicationSteps: ["Contact local agriculture department", "Soil sample collection", "Testing at lab", "Card generation", "Receive recommendations"],
    deadline: "Ongoing",
    link: "https://soilhealth.dac.gov.in",
    icon: "🧪",
  },
  {
    id: 5,
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Farm Equipment",
    objective: "Increase reach of farm mechanization to small and marginal farmers.",
    eligibility: "Individual farmers, FPOs, cooperatives, entrepreneurs for custom hiring centres.",
    benefits: "Subsidy of 40-50% on purchase of farm machinery. Custom hiring centres establishment support.",
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Quotation from dealer"],
    applicationSteps: ["Register on DBT portal", "Select equipment", "Submit application online", "Verification", "Purchase & claim subsidy"],
    deadline: "March 31, 2025",
    link: "https://agrimachinery.nic.in",
    icon: "🚜",
  },
  {
    id: 6,
    name: "National Mission on Sustainable Agriculture (NMSA)",
    category: "Seed & Fertilizer",
    objective: "Make agriculture more productive and sustainable through climate-resilient practices.",
    eligibility: "All farmers practising or willing to adopt sustainable agriculture practices.",
    benefits: "Free/subsidized seeds, bio-fertilizers. Training on organic farming. Financial support for soil amendments.",
    documents: ["Aadhaar Card", "Farm Details", "Land Records"],
    applicationSteps: ["Contact District Agriculture Officer", "Enroll in program", "Attend training", "Receive inputs", "Implementation support"],
    deadline: "Ongoing",
    link: "https://nmsa.dac.gov.in",
    icon: "🌱",
  },
];

export const mockDiseases = [
  { name: "Leaf Blight", severity: "High", crop: "Rice", treatment: "Apply Mancozeb 75% WP @ 2.5g/L", icon: "🍂" },
  { name: "Powdery Mildew", severity: "Medium", crop: "Wheat", treatment: "Spray Karathane @ 0.5ml/L", icon: "🍃" },
  { name: "Bacterial Wilt", severity: "Critical", crop: "Tomato", treatment: "Use resistant varieties, soil solarization", icon: "🥀" },
];

export const mockNotifications = [
  { id: 1, type: "warning", title: "Heavy Rain Alert", message: "Heavy rainfall expected in your district for next 48 hours. Secure crops.", time: "2 hours ago", read: false },
  { id: 2, type: "info", title: "PMFBY Deadline Approaching", message: "Last date to apply for Kharif crop insurance is July 31.", time: "5 hours ago", read: false },
  { id: 3, type: "success", title: "Soil Test Results Ready", message: "Your soil health card report is now available for download.", time: "1 day ago", read: true },
  { id: 4, type: "danger", title: "Pest Alert: Fall Armyworm", message: "Fall armyworm reported in nearby areas. Take preventive measures.", time: "2 days ago", read: false },
  { id: 5, type: "info", title: "New Scheme Available", message: "State government launched new subsidy for drip irrigation systems.", time: "3 days ago", read: true },
];

export const mockAdvisories = [
  { title: "Sowing Advisory", message: "Ideal time for Kharif sowing begins. Prepare fields with pre-monsoon showers.", type: "sowing", icon: "🌱" },
  { title: "Irrigation Alert", message: "Reduce irrigation frequency due to expected rainfall this week.", type: "irrigation", icon: "💧" },
  { title: "Pest Control", message: "Apply neem-based pesticide as preventive measure against aphids.", type: "pest", icon: "🐛" },
  { title: "Fertilizer Application", message: "Apply second dose of nitrogen fertilizer to rice crop at tillering stage.", type: "fertilizer", icon: "🧪" },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const soilTypes = ["Alluvial", "Black (Regur)", "Red", "Laterite", "Desert", "Mountain", "Peaty/Marshy"];
