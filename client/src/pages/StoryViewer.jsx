// import React from "react";
// import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import PageCard from "../components/PageCard.jsx";

// export default function StoryViewer(){
//   const { state } = useLocation();
//   const story = state?.story;

//   if (!story) return <p className="text-center text-gray-600">No story to show. Go back and generate one.</p>;

//   async function downloadPdf(){
//     const doc = new jsPDF({ unit: "px", format: "a4" }); // 595 x 842 px
//     for (let i=0; i<story.pages.length; i++){
//       const p = story.pages[i];
//       if (i>0) doc.addPage();
//       // image
//       try {
//         const img = p.imageDataUrl.startsWith("data:image/svg")
//           ? p.imageDataUrl : p.imageDataUrl.replace(/^data:image\/[^;]+;base64,/, "");
//         const type = p.imageDataUrl.includes("svg+xml") ? "SVG" : "PNG";
//         if (type === "SVG") {
//           // jsPDF can't add SVG directly in all builds; draw a placeholder
//           doc.setFontSize(12);
//           doc.text("(SVG illustration – see web app for full image)", 20, 40);
//         } else {
//           doc.addImage(img, "PNG", 20, 20, 555, 300);
//         }
//       } catch (err) {
//   console.error("Error adding image to PDF:", err);
// }


//       doc.setFontSize(18); doc.text(`${i+1}. ${p.page_title}`, 20, 350);
//       doc.setFontSize(12);
//       const text = doc.splitTextToSize(p.page_text, 555);
//       doc.text(text, 20, 380);
//     }
//     doc.save(`${story.storyName || "storybook"}.pdf`);
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">“{story.storyName}”</h2>
//         <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={downloadPdf}>
//           Download PDF
//         </button>
//       </div>
//       <div className="grid md:grid-cols-2 gap-4">
//         {story.pages.map((p, i) => <PageCard key={i} page={p} index={i} />)}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import PageCard from "../components/PageCard.jsx";

export default function StoryViewer() {
  const { state } = useLocation();
  const story = state?.story;

  if (!story) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 p-8 text-center">
        <div className="bg-purple-600/20 p-4 rounded-lg inline-block mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Story Found</h3>
        <p className="text-gray-400 mb-6">Your magical story disappeared! Go back and generate a new one.</p>
        <a 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Story Creator
        </a>
      </div>
    </div>
  );

  async function downloadPdf() {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    });

    // Page dimensions in mm (A4)
    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 15; // mm margin on all sides
    const contentWidth = pageWidth - (margin * 2);
    
    for (let i = 0; i < story.pages.length; i++) {
      const page = story.pages[i];
      if (i > 0) doc.addPage();

      try {
        // Calculate image dimensions to maintain aspect ratio
        const maxImageHeight = 120; // mm
        const maxImageWidth = contentWidth;
        
        // Add image (if available and not SVG)
        if (page.imageDataUrl && !page.imageDataUrl.includes("svg+xml")) {
          const imgData = page.imageDataUrl.replace(/^data:image\/[^;]+;base64,/, "");
          
          // Get image dimensions to maintain aspect ratio
          const imgProps = await getImageProperties(page.imageDataUrl);
          const imgRatio = imgProps.width / imgProps.height;
          
          let imgWidth = maxImageWidth;
          let imgHeight = maxImageWidth / imgRatio;
          
          if (imgHeight > maxImageHeight) {
            imgHeight = maxImageHeight;
            imgWidth = maxImageHeight * imgRatio;
          }
          
          // Center the image horizontally
          const imgX = margin + (contentWidth - imgWidth) / 2;
          const imgY = margin;
          
          doc.addImage({
            imageData: imgData,
            x: imgX,
            y: imgY,
            width: imgWidth,
            height: imgHeight,
            format: 'PNG'
          });
        } else if (page.imageDataUrl?.includes("svg+xml")) {
          // Placeholder for SVG images
          doc.setFontSize(10);
          doc.text("(Illustration available in web version)", margin, margin + 10);
        }
      } catch (err) {
        console.error("Error adding image to PDF:", err);
      }

      // Add title
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      const titleY = margin + (page.imageDataUrl ? 130 : 20); // Position below image or at top
      doc.text(`${i + 1}. ${page.page_title}`, margin, titleY);
      
      // Add story text
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      const textY = titleY + 10;
      const lineHeight = 6;
      
      const splitText = doc.splitTextToSize(page.page_text, contentWidth);
      let currentY = textY;
      
      for (let j = 0; j < splitText.length; j++) {
        // Check if we need a new page
        if (currentY + lineHeight > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
        }
        doc.text(splitText[j], margin, currentY);
        currentY += lineHeight;
      }
    }

    doc.save(`${story.storyName || "storybook"}.pdf`);
  }

  // Helper function to get image dimensions
  async function getImageProperties(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
        resolve({
          width: this.width,
          height: this.height
        });
      };
      img.src = dataUrl;
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with title and download button */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-6 bg-gray-800 rounded-2xl border border-gray-700">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="bg-purple-600 p-2 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">"{story.storyName}"</h2>
          </div>
          <button
            onClick={downloadPdf}
            className="flex items-center px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Storybook
          </button>
        </div>

        {/* Story pages grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {story.pages.map((p, i) => (
            <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg transform hover:scale-[1.01] transition duration-200">
              <PageCard page={p} index={i} />
            </div>
          ))}
        </div>

        {/* Back to creator button */}
        <div className="mt-10 text-center">
          <a 
            href="/" 
            className="inline-flex items-center px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition duration-200 border border-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Create Another Story
          </a>
        </div>
      </div>
    </div>
  );
}