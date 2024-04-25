import React from 'react';

const SeismicInputsTable = () => {
  return (
    <div>
      <h2>Inputs for Seismic Hazard Analysis in Tunnel Construction</h2>
      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Purpose</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Location (Latitude and Longitude)</td>
            <td>Geographical coordinates specify the exact site of tunnel construction.</td>
            <td>Seismic activity varies by region. Inputting location allows access to specific seismic data, enhancing hazard assessments.</td>
          </tr>
          <tr>
            <td>Depth</td>
            <td>Indicates tunnel depth below the Earth's surface.</td>
            <td>Seismic waves attenuate differently at various depths. Deeper tunnels may experience reduced ground motion, impacting hazard assessment.</td>
          </tr>
          <tr>
            <td>Magnitude of Earthquake</td>
            <td>Denotes potential earthquake magnitude near the tunnel site.</td>
            <td>Larger earthquakes pose greater infrastructure hazards. Inputting magnitude estimates ground shaking effects.</td>
          </tr>
          <tr>
            <td>Soil Type</td>
            <td>Describes ground geological composition.</td>
            <td>Soil types influence seismic shaking susceptibility. Different soils amplify or dampen motion. Specifying soil type adjusts hazard assessment.</td>
          </tr>
          <tr>
            <td>Fault Proximity</td>
            <td>Indicates proximity to seismic fault lines.</td>
            <td>Close proximity to faults increases seismic hazard. Considering fault proximity adjusts hazard assessment for nearby fault risks.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SeismicInputsTable;
