````markdown
# 🧪 EC-MOF Explorer & Database

An interactive, searchable, and filterable web application designed to help researchers and students explore a comprehensive database of Electrically-Conductive Metal-Organic Frameworks (EC-MOFs). This tool provides a modern, intuitive interface to discover and compare MOFs based on their constituent metals, ligands, and conductivity.

Online Demo:
[https://dashboard.heroku.com/apps/ec-mof-selector](https://ec-mof-selector-0ae45af781c0.herokuapp.com/)

## ✨ Features

The EC-MOF Explorer goes beyond a simple list, offering a powerful set of tools to navigate the data:

* **⚡ Interactive Live Search:** Instantly filter the entire database by typing in the search bar. The search scans MOF names, ligands, and application descriptions in real-time.
* **🔬 Multi-Select Metal Filtering:** Compare materials by selecting multiple metals at once using a clean checkbox interface.
* **🎚️ Dynamic Conductivity Slider:** Use the logarithmic slider to intuitively narrow down your search to a specific range of electrical conductivity, from highly insulating to highly conductive materials.
* **📊 Smart Sorting:** Effortlessly sort the results by MOF Name (A-Z), Conductivity (High to Low), or Conductivity (Low to High).
* **🖼️ Rich Information Cards:** Each MOF is presented on a clean, modern "card" that displays all key information at a glance, including the ligand's molecular structure.
* **🌐 Direct Google Search:** Instantly perform a Google search for any research title with a single click to find the original publication and related works.
* **📱 Fully Responsive Design:** The interface is designed to work beautifully on desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

This project was built using a lightweight and efficient stack, focusing on a fast user experience without the overhead of a large framework.

* **Frontend:**
    * **HTML5:** For the core structure.
    * [**Tailwind CSS**](https://tailwindcss.com/): For all styling and the responsive layout.
    * [**Isotope.js**](https://isotope.metafizzy.co/): For the magical filtering, sorting, and grid layout.
    * **JavaScript (ES6):** For all client-side logic and interactivity.
* **Backend & Deployment:**
    * [**Node.js**](https://nodejs.org/): To run the web server.
    * [**Express.js**](https://expressjs.com/): A minimal server to serve the static files.
    * [**Heroku**](https://www.heroku.com/): For hosting and deployment.

## 🚀 How to Run Locally

To run this project on your own machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install dependencies:**
    This will install the `express` web server.
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```

4.  **Open the application:**
    Navigate to `http://localhost:3000` in your web browser.

## 📄 Data Source

The data for this project was compiled from various public research papers and scientific articles in the field of materials science and chemistry. Each entry includes the research title, allowing users to trace the information back to its original source. The application aims to serve as a convenient, aggregated starting point for research.

## 📜 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
````
