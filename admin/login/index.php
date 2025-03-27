<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#7952b3">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="signin.css">
    <link rel="stylesheet" href="style.css">
</head>

<body class="text-center">
    <main class="form-signin">
        <form action="login.php" method="POST">
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="username" name="username" placeholder="Username" 
                    value="<?php echo isset($_COOKIE['remembered_username']) ? htmlspecialchars($_COOKIE['remembered_username']) : ''; ?>">
                <label for="username">Username</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                    value="<?php echo isset($_COOKIE['remembered_password']) ? htmlspecialchars($_COOKIE['remembered_password']) : ''; ?>">
                <label for="password">Password</label>
            </div>

            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" name="remember_me" value="1" 
                        <?php echo isset($_COOKIE['remembered_username']) ? 'checked' : ''; ?>> Remember me
                </label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2025</p>
        </form>

        <?php
        session_start();
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = $_POST['username'];
            $password = $_POST['password'];

            // Dummy authentication
            if ($username === 'admin' && $password === 'admin') {
                $_SESSION['loggedin'] = true;

                // Handle "Remember me" functionality
                if (isset($_POST['remember_me'])) {
                    setcookie('remembered_username', $username, time() + (86400 * 30), "/"); // 30 days
                    setcookie('remembered_password', $password, time() + (86400 * 30), "/"); // 30 days
                } else {
                    setcookie('remembered_username', '', time() - 3600, "/"); // Expire cookie
                    setcookie('remembered_password', '', time() - 3600, "/"); // Expire cookie
                }

                header('Location: ../');
                exit();
            } else {
                echo "<p style='color:red;'>Invalid username or password</p>";
            }
        }
        ?>

    </main>
</body>

</html>