<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Task7php</title>
    <link rel="stylesheet" href="./php.css" />
</head>
<body>
    <main>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "users";
            //----------Create connection----------------
            $conn = mysqli_connect($servername, $username, $password, $dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            } 
            //----------get user data--------------------------                  
            $f_name = test_input($_POST['name']);
            $l_name = test_input($_POST['surname']);
            $phone = test_input($_POST['phone']);
            $address = test_input($_POST['address']);
            $email = test_input($_POST['email']);
            $birthday = test_input($_POST['birthday']);
            $date = test_input($_POST['date']);
            $s_mail = test_input($_POST['sent_mail']);
            $s_mes = test_input($_POST['sent_message']);
            $skills='I know such programing languages: ';
            for ($i = 1; $i <= 6; $i++) {
                $skill = test_input($_POST["skill$i"]);
                if($skill){
                    if($i !== 1){$skills .= ', ';}   
                    $skills .= $skill . ' for a ' . test_input($_POST["skill$i" . "_progress"]) . '%';
                }
            } 
            if($skills !== 'I know such programing languages: ') {
                $skills .= '.';
            } else {
                $skills='It do not know programing languages yet.';
            }
            
            $education = 'I learned in Hight School at ' . test_input($_POST['year_school']) . '.' . test_input($_POST['message_school']);
            $univer = test_input($_POST['year_univer']);
            if($univer){
                $education .= 'I learned in University at ' . $univer . '.' . test_input($_POST['message_univer']);
            }
            $master = test_input($_POST['year_master']);
            if($master){
                $education .= 'I learned in Master at ' . $master . '.' . test_input($_POST['message_master']);
            }
            $interest = 'I love ';
            $comma = false;
            for ($i = 1; $i <= 8; $i++) {
                if(isset($_POST["interest$i" . "_checkbox"])){
                    if($comma){$interest .= ', ';}   
                    $interest .= test_input($_POST["interest$i"]);
                    if(!$comma){$comma = true;}   
                }
            } 
            if($interest !== 'I love ') {
                $interest .= '.';
            } else {
                $interest="I do not have hobbies.";
            }
            $lang='I know such languages: ';
            for ($i = 1; $i <= 6; $i++) {
                $langs = test_input($_POST["lang$i$i"]);
                if($langs && $_POST["lang$i"]){
                    if($i !== 1){$lang .= ', ';}   
                    $lang .= $langs . ' for a ' . $_POST["lang$i"] . ' point';
                }
            } 
            if($lang !== 'I know such languages: ') {
                $lang .= '.';
            } else {
                $lang="I do not know foreign languages yet.";
            }
            //--------------insert data in database----------------------
              
            $sql = "INSERT INTO userdata (firstname, surname, phone, addres, email, birthday, create_date, skills,  education, interest, languages, sent_email, sent_message) 
            VALUES ('$f_name', '$l_name', '$phone', '$address', '$email', '$birthday', '$date', '$skills', '$education', '$interest', '$lang', '$s_mail', '$s_mes')";
            //---------------write user data in file------------------------
            $f = fopen('files/user_'.$l_name.'_'.$f_name.'_'.$birthday.'.doc', 'w');
            fwrite($f, "$l_name $f_name\n\n$email\n$phone\n$address\nDate of birthday: $birthday\n\n");
            fwrite($f, "EDUCATION\n$education\n");
            fwrite($f, "TECHNICAL SKILLS\n$skills\n");
            fwrite($f, "LANGUAGES\n$lang\n");
            fwrite($f, "INTERESTS\n$interest\n");
            fwrite($f, "P.S. \n$s_mes\n\n$date");
            fclose($f);
            //------------------save foto--------------------------------
            if($_FILES['foto']['error']==0){
                $tmpName=$_FILES['foto']['tmp_name'];
                $fotoDir = 'uploads/foto_'.$l_name.'_'.$f_name.'_'.$birthday.'.'.pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
                move_uploaded_file($tmpName, $fotoDir);                
            }            
            //----------------draw site------------------------        
            echo "<h1>$l_name $f_name</h1>";            
            echo "<h4><img src='$fotoDir'></h4>";
            echo "<h4>$email</h4>";
            echo "<h4>$phone</h4>";
            echo "<h4>$address</h4>";
            echo "<h4>Date of birthday: $birthday</h4>";
            echo "<h3>EDUCATION</h3><p>$education</p>";
            echo "<h3>TECHNICAL SKILLS</h3><p>$skills</p>";
            echo "<h3>INTERESTS</h3><p>$interest</p>";
            echo "<h3>P.S.</h3><p>$s_mes</p><p>$date</p>";
            
            $conn->close();
        }
        function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
        ?>
    </main>
</body>
</html>