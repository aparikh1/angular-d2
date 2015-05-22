app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {

	FlashCardsFactory.getFlashCards().then(function(resArray) {
		$scope.flashCards = resArray;
	});

	$scope.scores = ScoreFactory;

	$scope.categories = [
	    'MongoDB',
	    'Express',
	    'Angular',
	    'Node'
	];

	$scope.selectedCategory = null;

	$scope.getCategoryCards = function (category) {

		$scope.selectedCategory = category;

		FlashCardsFactory.getFlashCards().then(function(resArray) {
			var categoryArr = [];

			resArray.forEach(function (flashcard) {
				if (flashcard.category === category) {
					categoryArr.push(flashcard);
				}
			})
			$scope.flashCards = categoryArr;
		});
	}

	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;

			if (answer.correct) {
				$scope.scores.correct++;
			} else {
				$scope.scores.incorrect++;
			}
			
			flashCard.answeredCorrectly = answer.correct;
		}
	}

	$scope.reset = function () {
		FlashCardsFactory.getFlashCards().then(function(resArray) {
			$scope.flashCards = resArray;
		});
	}
});
