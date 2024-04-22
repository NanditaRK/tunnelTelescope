import React, { useState } from 'react';
import SeismicInputsTable from './SeismicInputsTable';

const GeologicalHazardAnalyzer = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [depth, setDepth] = useState('');
  const [magnitude, setMagnitude] = useState('');
  const [soilType, setSoilType] = useState('');
  const [faultProximity, setFaultProximity] = useState('');
  const [hazardProbability, setHazardProbability] = useState(null);

  const performPsha = (latitude, longitude, depth, magnitude, soilType, faultProximity) => {
    // Example parameters (to be replaced with actual data)
    const a_value = 0.1;  // Example attenuation value
    const b_value = 1.0;  // Example attenuation value
    const prob_exceedance = 0.05;  // Example probability of exceedance (return period of 50 years)

    // Site class factors for PGA (Peak Ground Acceleration) calculation
    const siteClassFactors = { 'A': 1.0, 'B': 1.2, 'C': 1.3, 'D': 1.4, 'E': 1.5 };
    const siteClassFactor = siteClassFactors[soilType] || 1.0;  // Default to 1.0 if soil type is not found

    // Calculate seismic hazard level (simplified example)
    const seismicHazardLevel = a_value * magnitude - b_value * depth;

    // Adjust hazard level based on location-specific factors
    let hazardAdjustment = 1.0;  // Default to no adjustment
    if (faultProximity === 'close') {
      hazardAdjustment = 0.5;  // Example hazard reduction factor for close proximity to fault
    }

    // Combine factors to calculate final hazard level
    const hazardLevel = seismicHazardLevel * siteClassFactor * hazardAdjustment;

    // Convert hazard level to probability of exceedance over a specific time period
    const probabilityOfExceedance = 1 - Math.exp(-hazardLevel * prob_exceedance);

    return probabilityOfExceedance;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform PSHA calculation
    const hazardProbability = performPsha(latitude, longitude, depth, magnitude, soilType, faultProximity);
    setHazardProbability(hazardProbability);
  };

  return (
    <div>
      <h1>Seismic Hazard Analysis</h1>
      <p>
This Tunnel Seismic Hazard Analyzer developed using React, is a \ software tool aimed at mitigating geological hazards for tunnel construction projects. By inputting key parameters such as geographic coordinates, tunnel depth, earthquake magnitude, soil characteristics, and proximity to faults, engineers and planners leverage the software to assess the risk of seismic events impacting tunnel infrastructure.

At its core, the software utilizes a Probabilistic Seismic Hazard Analysis (PSHA) algorithm, rooted in mathematical principles from probability theory and statistical analysis. This algorithm calculates the seismic hazard level based on input parameters, providing insights into the likelihood of seismic hazard exceedance within specified timeframes. Through attenuation functions, site class factors, and hazard adjustments, the software generates actionable risk assessments tailored to tunnel design and construction.

To improve accuracy and predictive capabilities, advanced machine learning techniques can be integrated into this analyzer. In the future, machine learning models, including neural networks and regression algorithms, that analyze extensive datasets of seismic events, geological features, and historical hazard records can be integrated which can offer better insights into potential seismic hazards.

Here are the description for the inputs and how they help calculate the final value: 
</p>
<SeismicInputsTable />
      <p>Input the following parameters to assess the risk of seismic hazards for tunnel construction:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Latitude:
          <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </label>
        <label>
          Longitude:
          <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </label>
        <label>
          Depth (meters):
          <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} />
        </label>
        <label>
          Magnitude of Earthquake:
          <input type="number" value={magnitude} onChange={(e) => setMagnitude(e.target.value)} />
          <span>(Estimated based on historical seismic data, seismic hazard maps, or expert consultation)</span>
        </label>
        <label>
          Soil Type:
          <input type="text" value={soilType} onChange={(e) => setSoilType(e.target.value)} />
        </label>
        <label>
          Fault Proximity:
          <select value={faultProximity} onChange={(e) => setFaultProximity(e.target.value)}>
            <option value="">Select</option>
            <option value="close">Close</option>
            <option value="far">Far</option>
          </select>
        </label>
        <button type="submit">Analyze</button>
      </form>
      {hazardProbability !== null && (
        <div>
          <h2>Result</h2>
          <p>Probability of seismic hazard exceedance: {hazardProbability}</p>
        </div>
      )}
    </div>
  );
};

export default GeologicalHazardAnalyzer;
