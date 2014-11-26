angular.module('comicCal')
.directive('addthisevent',function() {
	return {
		templateUrl:'partials/addthisevent.html',
		replace:true,
		scope: {
			subscription: '='
		},
		link:function(scope,el,attr) {
			//get info from scope

			//console.log(scope.subscription);
			var title = scope.subscription.series_id.name;
			var issue_no = scope.subscription.latest_issue.issue_no;
			var release_date = scope.subscription.latest_issue.release_date;
			var d = new Date(Date.parse(release_date));
			var date = d.getMonth()+1 + '/' + d.getDate() + '/' + d.getFullYear();

			var children = el.children();
			for(var i =0; i < children.length;i++) {
				var child = children[i];
				var cl = child.classList;
				if(cl.contains('_start') || cl.contains('_end')) {
					child.innerText = date;
				} else if (cl.contains('_summary') || cl.contains('_description')) {
					child.innerText = title + ' #' + issue_no;
				}
			}

			addthisevent.refresh();
		}
	};
})
