// src/app/styles/styles.js


const styles = {
  container: "min-h-screen z-[1] overflow-hidden bg-stone-50/80 text-neutral-900",


  navbar: "flex justify-between items-center px-6 py-4 mb-6 bg-neutral-100 bg-opacity-90 shadow fixed top-0 left-0 right-0 z-50",
  logo: "text-2xl font-bold text-neutral-900 no-underline hover:opacity-80",

  dropdownBtn: "flex items-center gap-2 bg-rose-800 text-stone-50 px-4 py-2 rounded-md text-sm  shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none",
  dropdownMenu: "absolute mt-2 right-0 w-56 bg-rose-300 border border-rose-700 rounded-md shadow-2xl z-50 backdrop-blur-xl animate-fade-in-down transition-all duration-300 ease-in-out",
  dropdownItem: "w-full text-left px-4 py-2 text-sm text-neutral-800 font-medium hover:bg-rose-800 hover:text-stone-50 rounded-md transition-colors duration-200",

  primaryBtn: "bg-rose-800 text-stone-50 px-6 py-2 rounded-md text-sm shadow hover:bg-rose-900 transition",
  secondaryBtn: "border border-rose-800 text-neutral-900 px-6 py-2 rounded-md text-sm hover:bg-rose-200 hover:scale-105 transition transform",

  heroTitle: "text-1xl md:text-5xl font-bold bg-gradient-to-r from-rose-800 to-rose-900 bg-clip-text text-transparent mb-6",
  heroSubtext: "text-lg md:text-xl text-gray-500 mb-6",
  heromain: "flex flex-col items-center justify-center px-4 py-20 pt-28 text-center",
  toggleContainer: "relative inline-flex bg-stone-200 rounded-md p-1 shadow-sm text-sm font-medium",
  toggleBtn: "relative z-10 px-6 py-2 rounded-md transition font-medium",
  toggleActive: "text-rose-800",
  toggleInactive: "text-gray-500 hover:text-rose-500",

  modalOverlay: "fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50",
  modalBox: "bg-stone-100 text-neutral-900 rounded-2xl p-10 shadow-xl relative max-w-lg w-full",
  modalClose: "absolute top-2 right-3 text-2xl font-bold text-neutral-900 hover:text-rose-500 cursor-pointer",

  vrImg: "rounded-xl shadow-lg overflow-hidden w-full h-64 bg-gray-200 flex items-center justify-center",
  box:"flex items-center gap-4 bg-gray-50 rounded-2xl shadow-md px-6 py-5 border border-gray-200 w-80 transition-transform duration-300 ease-in-out transform hover:bg-rose-200 hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-pointer",
  evaluationBox: "bg-stone-100 rounded-2xl shadow-lg p-8 border border-stone-200 flex flex-col justify-between h-full",
  evaluationItem: "space-y-4 text-neutral-800 text-md leading-relaxed list-disc list-inside",
  chartBox: "bg-stone-100 border border-stone-300 rounded-2xl shadow-lg p-8 flex flex-col justify-between h-full",
  demoBox: "relative overflow-hidden rounded-xl shadow-lg w-full max-w-4xl mx-auto aspect-video bg-gray-200 flex items-center justify-center",
  footer:"bg-rose-900 text-stone-100 py-8 mt-20",
  footer_div: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  footer_items: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0",
  
  LoadingSpinner: "fixed inset-0 z-50 bg-blur-100 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ease-in-out",
  loadingDiv: "w-20 h-20 border-t-4 border-b-4 border-pink-600 rounded-full animate-spin",
  div: "absolute inset-0 overflow-hidden flex items-center justify-center",
};

export default styles;
