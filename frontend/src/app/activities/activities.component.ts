import { Component, OnInit } from '@angular/core';
import { Activity } from '../activity.model';
import { ActivityService } from '../activity.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  activityById: Activity = {
    _id: '',
    activityName: '',
    duration: 0,
    caloriesBurned: 0,
    steps: 0,
    distance: 0,
    date: new Date()
  };
  showUpdateForm: boolean = false;
  updatedActivity: Activity = { _id: '', activityName: '', duration: 0, caloriesBurned: 0, steps: 0, distance: 0, date: new Date() };
  searchQuery: any;
  searchQueryDate: any;
  displayedActivities: Activity[] = [];
  activity: Activity = {
    _id: '',
    activityName: '',
    duration: 0,
    caloriesBurned: 0,
    steps: 0,
    distance: 0,
    date: new Date()
  };
  showAddForm: boolean = false;
  getActivityByIdDate: string = '';

  constructor(private activityService: ActivityService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.getAllActivities();
    }
  }

  ifLoggedIn(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      return isAuthenticated;
    });
  }

  getAllActivities(): void {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.activityService.getAllActivities(token).subscribe(
          (activities: Activity[]) => {
            this.activities = activities;
            this.displayedActivities = [...this.activities];
          },
          error => {
            console.error('Error fetching activities:', error);
          }
        );
      }
    }
  }

  getActivityById(id: string): void {
    const token = localStorage.getItem('token');
    this.showUpdateForm = false;
    this.showAddForm = false;
    console.log(id);
    if (token) {
      this.activityService.getActivityById(token, id).subscribe(
        (activity) => {
          this.activityById = activity;
          this.getActivityByIdDate = this.activityById.date.toString().slice(0, 10);
        },
        error => {
          console.error('Error in getting activity:', error);
        }
      )
    }
  }

  populateForm(activity: Activity): void {
    this.updatedActivity = { ...activity }; // Create a copy of the activity
    this.showUpdateForm = true;
  }

  updateActivity(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.activityService.updateActivity(token, this.updatedActivity).subscribe(
        (updatedActivity) => {
          const index = this.activities.findIndex(a => a._id === updatedActivity._id);
          if (index !== -1) {
            this.router.navigate(["/activities"]);
            this.activities[index] = updatedActivity;
            this.getAllActivities();
            this.showUpdateForm = false;
          }
          this.cancelUpdate();
        },
        error => {
          console.error('Error updating activity:', error);
        }
      );
    }
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.updatedActivity = { _id: '', activityName: '', duration: 0, caloriesBurned: 0, steps: 0, distance: 0, date: new Date() };
    this.activityById = {
      _id: '',
      activityName: '',
      duration: 0,
      caloriesBurned: 0,
      steps: 0,
      distance: 0,
      date: new Date()
    };
  }

  closeView(): void {
    this.activityById = {
      _id: '',
      activityName: '',
      duration: 0,
      caloriesBurned: 0,
      steps: 0,
      distance: 0,
      date: new Date()
    };
  }


  confirmDelete(activityId: string): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this activity?');
    if (confirmDelete) {
      this.deleteActivity(activityId);
    }
  }

  deleteActivity(id: string): void {
    const token = localStorage.getItem('token');
    this.showUpdateForm = false;
    if (token) {
      this.activityService.deleteActivity(token, id).subscribe(
        () => {
          this.activities = this.activities.filter(activity => activity._id !== id);
          this.displayedActivities = [...this.activities]
        },
        error => {
          console.error('Error deleting activity:', error);
        }
      );
    }
  }

  addActivity(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.showAddForm = true;
      this.showUpdateForm = false;
      this.activityService.addActivity(token, this.activity).subscribe(
        (newActivity: Activity) => {
          console.log('New activity added:', newActivity);
          this.closeAddForm();
          this.getAllActivities();
          this.router.navigate(["/activities"]);
        },
        error => {
          console.error('Error adding activity:', error);
        }
      );
    }
  }

  resetForm(): void {
    this.activity = {
      _id: '',
      activityName: '',
      duration: 0,
      caloriesBurned: 0,
      steps: 0,
      distance: 0,
      date: new Date()
    };
  }

  closeAddForm(): void {
    this.activity = {
      _id: '',
      activityName: '',
      duration: 0,
      caloriesBurned: 0,
      steps: 0,
      distance: 0,
      date: new Date()
    };
    this.showAddForm = false;
  }

  showAddFormFunction(): void {
    this.showAddForm = true;
  }

  applyFilter(): void {
    if (!this.searchQuery?.trim() && !this.searchQueryDate?.trim()) {
      this.displayedActivities = [...this.activities];
    }
    else if (this.searchQueryDate?.trim() && !this.searchQuery?.trim()) {
      const queryDate = this.searchQueryDate ? this.searchQueryDate.toLowerCase().trim() : this.searchQueryDate;
      this.displayedActivities = this.activities.filter(activity =>
        activity.date.toString().toLowerCase().includes(queryDate)
      );
    }
    else if (!this.searchQueryDate?.trim() && this.searchQuery?.trim()) {
      const query = this.searchQuery ? this.searchQuery.toLowerCase().trim() : this.searchQuery;
      this.displayedActivities = this.activities.filter(activity =>
        activity.activityName.toLowerCase().includes(query)
      );
    }
    else {
      const query = this.searchQuery ? this.searchQuery.toLowerCase().trim() : this.searchQuery;
      const queryDate = this.searchQueryDate ? this.searchQueryDate.toLowerCase().trim() : this.searchQueryDate;
      this.displayedActivities = this.activities.filter(activity =>
        activity.activityName.toLowerCase().includes(query) &&
        activity.date.toString().toLowerCase().includes(queryDate)
      );
      console.log(this.displayedActivities);
    }
  }

  clearFilter(): void {
    this.searchQuery = '';
    this.applyFilter();
  }

  clearFilterDate(): void {
    this.searchQueryDate = "";
    this.applyFilter();
  }
}
