<?php

?>

<head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="style.css">

	<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
	<script src="javascript.js"></script>

</head>

<body>
	<h1 class='center title'>To-Do <span class='outline'>List</span></h1>

	<div class='list'>
		<div class='entries'>
			<div class='entry'>
				<div class='task'>
					<input class='check' type='checkbox'>
					<input class='taskText' type='text' value='Hire Jakob Stålander Sigvard'></input>
				</div>
				<div class='delete'>
				</div>
			</div>

		</div>
		<div class='add'>
			<iconify-icon icon='zondicons:add-solid'></iconify-icon>
		</div>
	</div>

</body>
