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
        },
    ],
     tutorJobApply: [
        {
            tutorId: "TUTOR123",
            tutorEmail: "tutor1@example.com",
            currentLocation: "Dhaka, Bangladesh",
            tutorPhone: "+8801734567890",
            tutorWhatsappNumber: "+8801734567890",
            jobId: "JOB456",
            jobEmail: "job1@example.com",
        },
        {
            tutorId: "TUTOR456",
            tutorEmail: "tutor2@example.com",
            currentLocation: "Chittagong, Bangladesh",
            tutorPhone: "+8801934567890",
            tutorWhatsappNumber: "+8801934567890",
            jobId: "JOB789",
            jobEmail: "job2@example.com",
        },
        {
            tutorId: "TUTOR789",
            tutorEmail: "tutor3@example.com",
            currentLocation: "Sylhet, Bangladesh",
            tutorPhone: "+8801834567890",
            tutorWhatsappNumber: "+8801834567890",
            jobId: "JOB123",
            jobEmail: "job3@example.com",
        },
    ],
    tutorRequests: [
        {
            guardianId: "G1001",
            guardianEmail: "guardian1@example.com",
            category: "Online",
            location: "Dhaka",
            subLocation: "Dhanmondi",
            guardianPhone: "+8801712345678",
            guardianAddress: "House 10, Road 5, Dhanmondi",
            comments: "Looking for an experienced math tutor for grade 8.",
            tutorId: "T2001",
            tutorEmail: "tutor1@example.com",
        },
        {
            guardianId: "G1002",
            guardianEmail: "guardian2@example.com",
            category: "Home",
            location: "Chittagong",
            subLocation: "Panchlaish",
            guardianPhone: "+8801812345678",
            guardianAddress: "House 15, Road 3, Panchlaish",
            comments: "Need a tutor for advanced English literature.",
            tutorId: "T2002",
            tutorEmail: "tutor2@example.com",
        },
        {
            guardianId: "G1003",
            guardianEmail: "guardian3@example.com",
            category: "Online",
            location: "Sylhet",
            subLocation: "Zindabazar",
            guardianPhone: "+8801912345678",
            guardianAddress: "House 25, Zindabazar",
            comments: "Looking for a tutor for A-level physics preparation.",
            tutorId: "T2003",
            tutorEmail: "tutor3@example.com",
        },
    ],
    blogs: [
        {
            blogCode: "",
            userId: "12450321664",
            title: "Understanding JavaScript Fundamentals",
            slug: "understanding-javascript-fundamentals",
            image: 'default.png',
            medium: "Online",
            category: "Programming",
            subject: "JavaScript",
            studentHelp: "Beginners",
            description: "A comprehensive guide for beginners to learn JavaScript.",
            authorName: "John Doe",
            authorEducationLevel: "Bachelor's in Computer Science",
            authorStudySubject: "Programming",
            authorProfession: "Software Developer",
        },
        {
            blogCode: "",
            userId: "12450321669",
            title: "Introduction to Web Design",
            slug: "introduction-to-web-design",
            image: 'default.png',
            medium: "Online",
            category: "Design",
            subject: "Web Design",
            studentHelp: "Aspiring designers",
            description: "Learn the basics of creating beautiful websites.",
            authorName: "Jane Smith",
            authorEducationLevel: "Diploma in Graphic Design",
            authorStudySubject: "Design",
            authorProfession: "Web Designer",
        },
        {
            blogCode: "",
            userId: "12450321668",
            title: "Effective Study Strategies for Students",
            slug: "effective-study-strategies",
            image: 'default.png',
            medium: "Offline",
            category: "Education",
            subject: "Study Tips",
            studentHelp: "Students of all levels",
            description: "Tips and techniques to improve your study habits.",
            authorName: "Michael Johnson",
            authorEducationLevel: "Master's in Education",
            authorStudySubject: "Education",
            authorProfession: "Educator",
        }
    ],
    ratings: [
        {
            guardianId: "1001",
            guardianEmail: "john.doe@example.com",
            rating: 5,
            review: "Excellent service and very friendly.",
        },
        {
            guardianId: "1002",
            guardianEmail: "jane.smith@example.com",
            rating: 4,
            review: "Very helpful but could improve response time.",
        },
        {
            guardianId: "1003",
            guardianEmail: "alice.johnson@example.com",
            rating: 5,
            review: "Fantastic experience, highly recommend!",
        },
    ],
    contacts: [
        {
            userId: "1009",
            contactName: 'Saif Saiful',
            contactEmail: "john.doe@example.com",
            message: "Excellent service and very friendly.",
        },
        {
            userId: "1002",
            contactName: 'Arafat AT',
            contactEmail: "jane.smith@example.com",
            message: "Very helpful but could improve response time.",
        },
        {
            userId: "1003",
            contactName: 'Islam YP',
            contactEmail: "alice.johnson@example.com",
            message: "Fantastic experience, highly recommend!",
        },
    ]
}

data.users.forEach((user, index) => {
    const uniqueNumber = String(index + 1).padStart(5, '00100');
    user.userId = `HTPBD-${uniqueNumber}`;
});

data.tuitionJobs.forEach((tuition, index) => {
    const words = tuition.jobLocation.trim().split(" ");
    const lastWord = words[words.length - 1].replace(/[^a-zA-Z]/g, "");
    const jobCodePart = lastWord.slice(0, 3).toUpperCase();
    const uniqueNumber = String(index + 1).padStart(4, "0");
    tuition.tuitionCode = `${jobCodePart}-${uniqueNumber}`;
});

data.blogs.forEach((blog, index) => {
    const initials = blog.authorName
        .trim()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase())
        .join("");
    const uniqueNumber = String(index + 1).padStart(4, "0");
    blog.blogCode = `${initials}-${uniqueNumber}`;
});


module.exports = data; 