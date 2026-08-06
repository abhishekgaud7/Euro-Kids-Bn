import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SCHOOL_INFO, PROGRAMS_DATA, DAY_ROUTINE } from '../data/schoolData';
import toast from 'react-hot-toast';

// 1. Generate Academic Prospectus 2026-27 PDF
export const downloadProspectusPDF = () => {
  try {
    const doc = new jsPDF();

    // Header Banner
    doc.setFillColor(245, 158, 11); // EuroKids Amber
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('EuroKids Balwant Nagar', 14, 18);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Academic Prospectus & Curriculum Guide • Session 2026-27', 14, 28);

    // School Contact Box
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    doc.text(`Address: ${SCHOOL_INFO.address}`, 14, 46);
    doc.text(`Phone: ${SCHOOL_INFO.phone} | Email: ${SCHOOL_INFO.email}`, 14, 52);

    doc.setDrawColor(226, 232, 240);
    doc.line(14, 56, 196, 56);

    // Section 1: Welcome Message
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 119, 6); // Amber dark
    doc.text('Welcome to EuroKids Balwant Nagar, Gwalior', 14, 66);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const welcomeText = `EuroKids Balwant Nagar provides a happy, cozy environment where young children feel at home while they learn. Our Heureka Visible Thinking curriculum blends play, sensory activities, phonic sounds, and early math concepts to prepare your child for Grade 1 with confidence.`;
    const splitWelcome = doc.splitTextToSize(welcomeText, 180);
    doc.text(splitWelcome, 14, 73);

    // Section 2: Programs Table
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 119, 6);
    doc.text('Early Childhood Programs', 14, 98);

    const programRows = PROGRAMS_DATA.map((prog) => [
      prog.name,
      prog.ageGroup,
      prog.timing,
      prog.subtitle
    ]);

    autoTable(doc, {
      startY: 104,
      head: [['Program Name', 'Age Group', 'Class Timing', 'Learning Focus']],
      body: programRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 9 }
    });

    // Section 3: Safety & Campus Features
    const nextY = (doc as any).lastAutoTable.finalY + 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(217, 119, 6);
    doc.text('Child Safety & Campus Infrastructure', 14, nextY);

    const safetyList = [
      '• 100% CCTV Monitored Classrooms & Entry Gates',
      '• Police Verified Educators & Maid Support Staff',
      '• Soft Safety Padded Outdoor Play Flooring & Tricycle Track',
      '• Supervised Transport Buses Covering Major Gwalior Localities',
      '• Hygienic Mid-Morning Snack Preparation Kitchen & RO Water'
    ];

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    let currentY = nextY + 7;
    safetyList.forEach((item) => {
      doc.text(item, 14, currentY);
      currentY += 6;
    });

    // Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 275, 210, 22, 'F');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('EuroKids Balwant Nagar, Thatipur, Gwalior • Phone: +91-9183686765', 14, 285);

    doc.save('EuroKids-Balwant-Nagar-Academic-Prospectus-2026-27.pdf');
    toast.success('EuroKids Academic Prospectus downloaded!');
  } catch (err) {
    console.error(err);
    toast.error('Failed to generate Prospectus PDF');
  }
};

// 2. Generate Center Admission Form PDF
export const downloadAdmissionFormPDF = () => {
  try {
    const doc = new jsPDF();

    // Header Banner
    doc.setFillColor(30, 41, 59); // Slate 900
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('EuroKids Balwant Nagar, Gwalior', 14, 18);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Admission Application Form • Session 2026-27', 14, 28);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. STUDENT INFORMATION', 14, 46);

    const studentFields = [
      ['Child Full Name:', '____________________________________'],
      ['Date of Birth (DD/MM/YYYY):', '____________________', 'Gender:', 'Male / Female'],
      ['Program Applying For:', '[ ] Playgroup  [ ] Nursery  [ ] Junior KG  [ ] Senior KG'],
      ['Blood Group:', '________', 'Aadhaar No (Optional):', '____________________']
    ];

    autoTable(doc, {
      startY: 50,
      body: studentFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y1 = (doc as any).lastAutoTable.finalY + 6;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. PARENT / GUARDIAN DETAILS', 14, y1);

    const parentFields = [
      ["Father's Name:", '________________________', 'Occupation:', '____________________'],
      ["Mother's Name:", '________________________', 'Occupation:', '____________________'],
      ['Primary Contact Phone:', '________________________', 'WhatsApp No:', '____________________'],
      ['Email Address:', '____________________________________'],
      ['Residential Address:', '________________________________________________________'],
      ['Locality / Area in Gwalior:', '________________________', 'Pin Code:', '474011']
    ];

    autoTable(doc, {
      startY: y1 + 4,
      body: parentFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y2 = (doc as any).lastAutoTable.finalY + 6;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('3. TRANSPORT & MEDICAL OPTIONS', 14, y2);

    const optionFields = [
      ['Require School Bus Transport?:', '[ ] Yes  [ ] No', 'Stop Location:', '____________________'],
      ['Known Allergies / Food Sensitivity:', '________________________________________________']
    ];

    autoTable(doc, {
      startY: y2 + 4,
      body: optionFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y3 = (doc as any).lastAutoTable.finalY + 6;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('4. REQUIRED ATTACHMENTS CHECKLIST', 14, y3);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text('[ ] Photocopy of Birth Certificate', 14, y3 + 6);
    doc.text('[ ] 4 Passport Size Photographs of Child', 14, y3 + 12);
    doc.text('[ ] Immunization / Vaccination Record Copy', 110, y3 + 6);
    doc.text('[ ] Residence Proof Copy (Aadhaar / Bill)', 110, y3 + 12);

    // Signatures
    doc.setDrawColor(203, 213, 225);
    doc.line(14, y3 + 32, 70, y3 + 32);
    doc.text("Parent / Guardian Signature", 14, y3 + 37);

    doc.line(130, y3 + 32, 196, y3 + 32);
    doc.text("EuroKids Desk Officer Signature", 130, y3 + 37);

    doc.save('EuroKids-Balwant-Nagar-Admission-Form.pdf');
    toast.success('Center Admission Form downloaded!');
  } catch (err) {
    console.error(err);
    toast.error('Failed to generate Admission Form PDF');
  }
};

// 3. Generate Health & Emergency Contact Form PDF
export const downloadHealthFormPDF = () => {
  try {
    const doc = new jsPDF();

    // Header Banner
    doc.setFillColor(16, 185, 129); // Emerald Green
    doc.rect(0, 0, 210, 36, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('EuroKids Balwant Nagar, Gwalior', 14, 18);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Child Health & Emergency Contact Information Record', 14, 28);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. CHILD HEALTH RECORD', 14, 46);

    const healthFields = [
      ['Child Full Name:', '____________________________________', 'DOB:', '______________'],
      ['Blood Group:', '________', 'Height (cm):', '________', 'Weight (kg):', '________'],
      ['Known Allergies (Food / Medicines):', '________________________________________________'],
      ['Existing Medical Condition (if any):', '________________________________________________']
    ];

    autoTable(doc, {
      startY: 50,
      body: healthFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y1 = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. EMERGENCY CONTACT PERSONS', 14, y1);

    const emergencyFields = [
      ['Primary Emergency Contact Name:', '________________________', 'Relation:', '______________'],
      ['Primary Phone Number:', '________________________', 'Alt Phone:', '______________'],
      ['Secondary Emergency Contact Name:', '________________________', 'Relation:', '______________'],
      ['Secondary Phone Number:', '________________________', 'Alt Phone:', '______________']
    ];

    autoTable(doc, {
      startY: y1 + 4,
      body: emergencyFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y2 = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('3. PEDIATRICIAN / FAMILY DOCTOR DETAILS', 14, y2);

    const doctorFields = [
      ['Doctor Name:', '________________________', 'Clinic Name:', '____________________'],
      ['Doctor Phone:', '________________________', 'Clinic Address (Gwalior):', '________________']
    ];

    autoTable(doc, {
      startY: y2 + 4,
      body: doctorFields,
      theme: 'plain',
      styles: { fontSize: 9, cellPadding: 2 }
    });

    const y3 = (doc as any).lastAutoTable.finalY + 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('4. MEDICAL EMERGENCY AUTHORIZATION', 14, y3);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const authText = `In case of a medical emergency, I authorize EuroKids Balwant Nagar staff to administer first-aid and, if necessary, contact the emergency contacts or transfer my child to the nearest medical facility in Gwalior.`;
    const splitAuth = doc.splitTextToSize(authText, 180);
    doc.text(splitAuth, 14, y3 + 6);

    doc.setDrawColor(203, 213, 225);
    doc.line(14, y3 + 30, 80, y3 + 30);
    doc.text("Parent / Guardian Signature & Date", 14, y3 + 35);

    doc.save('EuroKids-Child-Health-and-Emergency-Form.pdf');
    toast.success('Child Health & Emergency Contact Form downloaded!');
  } catch (err) {
    console.error(err);
    toast.error('Failed to generate Health Form PDF');
  }
};
