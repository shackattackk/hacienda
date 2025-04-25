import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NDVI Guide - Understanding Vegetation Health",
  description: "Learn about NDVI, how to interpret vegetation health maps, and how to use this information for better farm management.",
}

export default function GuidePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Understanding NDVI for Farm Management</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is NDVI?</h2>
        <p className="mb-4">
          NDVI (Normalized Difference Vegetation Index) is a numerical indicator that uses the visible and near-infrared bands of the electromagnetic spectrum to analyze whether the target being observed contains live green vegetation or not. It's a powerful tool for monitoring vegetation health and growth.
        </p>
        <p className="mb-4">
          The NDVI value ranges from -1 to 1, where:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Values close to 1 indicate dense, healthy vegetation</li>
          <li>Values close to 0 indicate bare soil or non-vegetated areas</li>
          <li>Negative values typically represent water, snow, or clouds</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seasonal NDVI Interpretation</h2>
        <p className="mb-4">
          Understanding how NDVI values change throughout the growing season is crucial for accurate interpretation. Here's what to expect during different stages:
        </p>
        
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Early Season (Planting to Early Growth)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>NDVI values typically range from 0.1 to 0.3</li>
              <li>Low values are normal as plants are just emerging</li>
              <li>Look for consistent values across the field to ensure uniform emergence</li>
              <li>Sudden drops in NDVI might indicate planting issues or poor germination</li>
            </ul>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Mid-Season (Active Growth)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>NDVI values typically range from 0.4 to 0.8</li>
              <li>Peak values indicate maximum vegetative growth</li>
              <li>Look for steady increases in NDVI as plants mature</li>
              <li>Plateaus or decreases might indicate stress or nutrient deficiencies</li>
              <li>Compare with historical data for the same crop and growth stage</li>
            </ul>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Late Season (Maturity to Harvest)</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>NDVI values typically decline from 0.6-0.8 to 0.2-0.4</li>
              <li>Natural decline indicates crop maturity and senescence</li>
              <li>Rapid drops might indicate premature stress or disease</li>
              <li>Use NDVI trends to help determine optimal harvest timing</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Key Considerations for Seasonal Analysis</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Establish baseline NDVI curves for your specific crops and varieties</li>
              <li>Account for weather conditions when interpreting seasonal changes</li>
              <li>Compare current season's NDVI progression with historical data</li>
              <li>Use NDVI trends to identify potential issues before they become visible</li>
              <li>Consider crop-specific growth patterns when interpreting values</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Interpret the Color Map</h2>
        <p className="mb-4">
          Our NDVI map uses a color gradient to represent different vegetation health levels:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold mb-2">Green Areas</h3>
            <p>Indicate healthy, dense vegetation with high chlorophyll content. These areas are typically growing well and receiving adequate nutrients.</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg">
            <h3 className="font-semibold mb-2">Yellow Areas</h3>
            <p>Represent moderate vegetation health. These areas might need attention or could be in transition between growth stages.</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-semibold mb-2">Red Areas</h3>
            <p>Indicate stressed or sparse vegetation. These areas may require immediate attention for irrigation, fertilization, or pest control.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Gray/White Areas</h3>
            <p>Represent non-vegetated areas like buildings, roads, or bare soil.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Practical Applications in Farm Management</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">1. Early Problem Detection</h3>
            <p>NDVI maps can help identify areas of stress before they become visible to the naked eye, allowing for early intervention.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">2. Irrigation Management</h3>
            <p>Use NDVI data to optimize irrigation by identifying areas that need more or less water, potentially reducing water usage while maintaining crop health.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">3. Fertilization Planning</h3>
            <p>Target fertilizer applications to areas showing lower NDVI values, ensuring efficient use of resources and reducing environmental impact.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">4. Growth Monitoring</h3>
            <p>Track vegetation growth over time to make informed decisions about harvest timing and yield predictions.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold mb-2">5. Pest and Disease Detection</h3>
            <p>Identify potential pest or disease outbreaks early by monitoring changes in NDVI values across your fields.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Best Practices for Using NDVI Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Regularly monitor your fields to establish baseline NDVI values</li>
          <li>Compare current readings with historical data to identify trends</li>
          <li>Consider weather conditions when interpreting NDVI values</li>
          <li>Use NDVI data in combination with other agronomic information</li>
          <li>Ground-truth unusual readings with physical field inspections</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Limitations and Considerations</h2>
        <p className="mb-4">
          While NDVI is a powerful tool, it's important to understand its limitations:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>NDVI can be affected by atmospheric conditions and cloud cover</li>
          <li>Different crop types may show different NDVI values at the same growth stage</li>
          <li>Soil background can influence NDVI readings, especially in sparse vegetation</li>
          <li>NDVI values should be interpreted in the context of your specific crop and growing conditions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <p className="mb-4">
          For more detailed information about NDVI and precision agriculture, consider these resources:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>USDA Precision Agriculture Resources</li>
          <li>NASA Earth Observatory - Understanding NDVI</li>
          <li>University Extension Services</li>
          <li>Precision Agriculture Research Papers</li>
        </ul>
      </section>
    </div>
  )
} 