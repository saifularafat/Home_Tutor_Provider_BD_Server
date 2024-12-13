const data = {
    users: [
        {
            name: "saiful islam",
            userId: '',
            email: "saifulislam@gmail.com",
            password: "Saiful0123@",
            phone: "+8801855544679",
            address: "comilla, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'male',
        },
        {
            name: "Islam",
            userId: '',
            email: "islam123@gmail.com",
            password: "Saiful0123@",
            phone: "+8801855544670",
            address: "Feni, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'female',
        },
        {
            name: "Arafat",
            userId: '',
            email: "arafat234@gmail.com",
            password: "Saiful0123@",
            phone: "+8801855544675",
            address: "B-Baria, Chittagong",
            image: 'default.png',
            nidBirth: 'default.png',
            gender: 'male',
        },
    ],
    // tuition job demo data
    tuitionJobs: [
        {
            tuitionCode: "",
            jobLocation: "123 Tuition Street, Dhaka",
            slug: "123-tuition-street-dhaka",
            jobSalary: 5000,
            contactNumber: '8801653231964',
            whatsAppNumber: '8801000000000',
            tutorGender: "Male",
            medium: "English Medium",
            jobCategory: "Math Tutor",
            perWeek: 3,
            className: "Class 8",
            subject: "Mathematics",
            jobComment: "Must have 2 years of experience.",
            duration: "3 months",
            studentGender: "Male",
            studentSchool: "ABC International School",
            fixedTime: "6:00 PM to 7:00 PM",
            description: "Looking for an experienced math tutor for Class 8."
        },
        {
            tuitionCode: "",
            jobLocation: "456 Education Avenue, Chittagong",
            slug: "456-education-avenue-chittagong",
            jobSalary: 8000,
            contactNumber: '8801653231964',
            whatsAppNumber: '8801000000000',
            tutorGender: "Female",
            medium: "Bangla Medium",
            jobCategory: "Science Tutor",
            perWeek: 4,
            className: "Class 10",
            subject: "Physics, Chemistry, Biology",
            jobComment: "Should be flexible with timings.",
            duration: "6 months",
            studentGender: "Female",
            studentSchool: "XYZ High School",
            fixedTime: "5:00 PM to 6:30 PM",
            description: "Need a dedicated science tutor for Class 10."
        },
        {
            tuitionCode: "",
            jobLocation: "789 Learning Lane, Sylhet",
            slug: "789-learning-lane-sylhet",
            jobSalary: 4500,
            contactNumber: '8801653231964',
            whatsAppNumber: '8801000000000',
            tutorGender: "Any",
            medium: "English Version",
            jobCategory: "Language Tutor",
            perWeek: 2,
            className: "Class 5",
            subject: "English, Literature",
            jobComment: "Preferably with experience in creative writing.",
            duration: "1 month",
            studentGender: "Male",
            studentSchool: "Sylhet Grammar School",
            fixedTime: "4:00 PM to 5:00 PM",
            description: "English tutor required for improving language skills."
        }
    ]
}
data.users.forEach((user, index) => {
    const uniqueNumber = String(index + 1).padStart(5, '00100');
    user.userId = `HTPBD-${uniqueNumber}`;
});

data.tuitionJobs.forEach((tuition, index) => {
    // Extract the last word of jobLocation
    const words = tuition.jobLocation.trim().split(" ");
    const lastWord = words[words.length - 1].replace(/[^a-zA-Z]/g, "");
    const jobCodePart = lastWord.slice(0, 3).toUpperCase();

    // Generate a unique 4-digit number based on the index
    const uniqueNumber = String(index + 1).padStart(4, "0");

    // Assign the generated tuitionCode
    tuition.tuitionCode = `${jobCodePart}-${uniqueNumber}`;
});


module.exports = data; 