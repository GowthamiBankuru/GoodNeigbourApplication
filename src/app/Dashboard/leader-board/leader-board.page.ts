import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { UserDefinedLabels } from 'src/assets/labelsContants';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.page.html',
  styleUrls: ['./leader-board.page.scss'],
})
export class LeaderBoardPage implements OnInit {

  displayedColumns: string[] = ['rank', 'userName', 'rewardPoint', 'rewardName'];
  labels = UserDefinedLabels;
  noDataFoundFlag: boolean = false;

  responseData: any[] = [];
  levels: any | undefined;
  rewardObject: any | undefined;

  urls = [
    'https://img.freepik.com/premium-vector/reward-icon_543534-143.jpg?w=2000',
    'https://cdn-icons-png.flaticon.com/512/5637/5637228.png',
    'https://png.pngtree.com/png-vector/20220731/ourmid/pngtree-3rd-place-bronze-medal-award-icon-png-image_6093735.png',
    'https://cdn-icons-png.flaticon.com/512/2441/2441713.png',
    'https://cdn-icons-png.flaticon.com/512/2441/2441713.png'
];
  currentRole: any;


  constructor(private service$: GetService) { }
  ngOnInit(): void {
    this.currentRole = sessionStorage.getItem('currentUserRole');
    this.GetLeaderBoardDetails();
  }

  GetLeaderBoardDetails() {
    this.service$.getLeaderBoardDetails().subscribe(data => {
      if (data[UserDefinedLabels.result][0].length === 0) {
        this.noDataFoundFlag = true;
      } else {
        this.noDataFoundFlag = false;
      }
      if (data && data['statusCode'] === UserDefinedLabels.StatusCode_200 && data[UserDefinedLabels.result] && data[UserDefinedLabels.result].length > 0) {
        this.responseData = data[UserDefinedLabels.result][0];
        
        this.responseData = this.responseData.map((reward, index) => ({
          ...reward,
          url: this.urls[index]
        }));
        
        console.log('this.responseData------->', this.responseData);
      // console.log(JSON.stringify(rewardsWithUrls, null, 2));

      } else {
        this.responseData = [];
      }
    })
  }
}
