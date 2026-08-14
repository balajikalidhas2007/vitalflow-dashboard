# VitalFlow: Intelligent IV Telemetry & Dashboard

## The Problem
On busy hospital wards, nurses must manually check IV bags bed-by-bed. This analog process is inefficient, prone to human error, and risks delayed critical interventions at hours like 3:00 AM when staffing is lowest.

## The Solution
VitalFlow is a clinical-grade, real-time IV fluid monitoring system. By bridging hardware sensors with a centralized digital dashboard, it tracks fluid levels, calculates dynamic flow rates, and intelligently predicts depletion times. Beds are automatically triaged by severity, ensuring medical staff know exactly where they are needed, right when they are needed.

## Key Features
* **Predictive Depletion Engine:** Applies data science principles to historical flow readings to forecast precise empty times.
* **Automated Triage System:** Auto-classifies patient beds into Normal, Low Warning (<30%), or Critical (<15%) states based on live metrics.
* **Live Ward Overview:** A responsive dashboard that automatically surfaces critical alerts to the top of the queue.
* **Integrated Telemetry Simulator:** Features a built-in simulation engine generating dynamic payload ticks for offline testing and presentations.

## Instructions to Run Locally
1. Open your terminal and navigate to the project directory.
2. Install the necessary dependencies by running:
   `npm install`
3. Start the local development server by running:
   `npm run dev`
4. Open the provided localhost link (e.g., `http://localhost:5173`) in your web browser.
5. Navigate to the Dashboard and click "Play" on the simulator banner to initiate live telemetry.

## Third-Party Open Source Components
In compliance with hackathon development guidelines, this project utilizes the following open-source frameworks and libraries:
* **React:** Core JavaScript UI library used to build the interactive component architecture.
* **Vite:** Next-generation frontend tooling used for local development and bundling.
* **Tailwind CSS:** Utility-first CSS framework utilized for responsive grid layouts and rapid styling.
* **Lucide-React:** Open-source SVG icon library used for clinical UI graphics.

## Team
* **K. Balaji** - Lead Developer & Software Architecture
* **K. Nithish Kumar** - Product Manager & Pitch Presenter
* **V Yazhini** - UI/UX Designer & QA Tester