<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">


    </head>
    <body>
			<ul>
					<?php foreach ($recipes as $recipe) : ?>
						<li>
<!--							<pre>-->
<!--								--><?//= print_r($recipe->category); ?>
<!--							</pre>-->


							<p><?= $recipe->title; ?> / calories: <?= $recipe->calories; ?></p>
								author: <?= $recipe->user->username ?>

								<br>

								category:
									<?php foreach ($recipe->category as $category) : ?>
										 <?= $category->category_name ?>
									<?php endforeach; ?>

								<br>

								steps:<br>
									<?php foreach ($recipe->steps as $step) : ?>
											<?= $step->step_number ?>
											<?= $step->description ?>
										<br>
									<?php endforeach; ?>

						</li>
					<?php endforeach; ?>
			</ul>
    </body>
</html>
