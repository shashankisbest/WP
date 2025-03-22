<?php
if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    $country = $_POST["country"];

    switch ($country)
    {
        case "USA": $message = "Visa required for most applicants.";
            break;
        case "Canada": $message = "Visa required unless you have an eTA.";
            break;
        case "India": $message = "Visa required before travel.";
            break;
        case "UK": $message = "Visa depends on the duration of stay.";
            break;
        case "Australia": $message = "eVisa available for eligible travelers.";
            break;
        default: $message = "Invalid country selection.";
    }

    echo "<p>$message</p>";
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visa Requirement Checker</title>
    <style>
        body
        {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        h2
        {
            color: #333;
        }
        select, input, button
        {
            display: block;
            margin: 10px auto;
            padding: 10px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            width: 250px;
        }
        button
        {
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover
        {
            background-color: #0056b3;
        }
        p
        {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        #errorMessage
        {
            color: red;
        }
    </style>
    
</head>
<body>
    <h2>Visa Requirement Checker</h2>
    
    <!-- Instant Visa Checker -->
    <select id="country">
        <option value="">Select Country</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="India">India</option>
        <option value="UK">UK</option>
        <option value="Australia">Australia</option>
    </select>
    <button onclick="checkVisa()">Check Visa</button>
    <p id="visaMessage"></p>

    <!-- PHP Form Submission -->
    <h2>Check Visa Requirement via Server</h2>
    <form action="visa_check.php" method="POST">
        <select name="country">
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
        </select>
        <button type="submit">Submit</button>
    </form>

    <!-- Visa Application Form -->
    <h2>Visa Application Form</h2>
    <form onsubmit="return validateForm()">
        <input type="text" id="fullname" placeholder="Full Name">
        <input type="text" id="passport" placeholder="Passport Number">
        <select id="applyCountry">
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
        </select>
        <button type="submit">Apply for Visa</button>
    </form>
    <p id="errorMessage"></p>



    <script>
        function checkVisa()
        {
            let country = document.getElementById("country").value;
            let message = "";
            switch (country)
            {
                case "USA": message = "Visa required for most applicants."; break;
                case "Canada": message = "Visa required unless you have an eTA."; break;
                case "India": message = "Visa required before travel."; break;
                case "UK": message = "Visa depends on the duration of stay."; break;
                case "Australia": message = "eVisa available for eligible travelers."; break;
                default: message = "Please select a country.";
            }
            document.getElementById("visaMessage").innerText = message;
        }

        function validateForm()
        {
            let fullname = document.getElementById("fullname").value;
            let passport = document.getElementById("passport").value;
            let country = document.getElementById("applyCountry").value;
            
            if (!fullname || !passport || !country)
            {
                document.getElementById("errorMessage").innerText = "All fields are required!";
                return false;
            }
            if (passport.length < 8 || passport.length > 10)
            {
                document.getElementById("errorMessage").innerText = "Invalid passport number!";
                return false;
            }
            document.getElementById("errorMessage").innerText = "Visa application submitted successfully!";
            return false; // Prevents actual submission for testing
        }
    </script>
</body>
</html>
