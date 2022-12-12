import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { filter, map } from 'rxjs/operators';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
  url: string;
  icon: string;
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Phones",
    children: [
      {
        name: "Android",
        url: "/phones/android",
        icon: "fab fa-android"
      },
      {
        name: "iPhone",
        url: "/phones/iphones",
        icon: "fab fa-apple"
      }
    ],
    url: "/phones",
    icon: "fas fa-mobile-alt"
  },
   {
    name: "Men's Fashion",
       children: [
        {
          name: "Clothings",
          url: "/men-fashion/clothings",
          icon: "fas fa-tshirt"
        },
        {
          name: "Shoes",
          url: "/men-fashion/shoes",
          icon: "fas fa-shoe-prints"
        },
        {
          name: "Watches",
          url: "/men-fashion/watches",
          icon: "fas fa-clock"
        }
       ],
       url: "/men-fashion",
       icon: "fas fa-male"
  }, {
    name: "Women's Fashion",
    children: [
          {
            name: "Clothings",
            url: "/women-fashion/clothings",
            icon: "fas fa-tshirt"
          },
          {
            name: "Shoes",
            url: "/women-fashion/shoes",
            icon: "fas fa-shoe-prints"
           },
          {
            name: "Bags",
            url: "/women-fashion/bags",
            icon: "fas fa-shopping-bag"
          }
        ],
        url: "/women-fashion",
        icon: "fas fa-female"
      }

];

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})


export class SidenavComponent implements OnInit {
  public opened = true;
  private mediaWatcher;

  constructor(private media: MediaObserver) {
      this.mediaWatcher = this.media.asObservable().pipe(filter((changes:MediaChange[])=> changes.length > 0), map((changes: MediaChange[])=> changes[0]))
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });

      this.dataSource.data = TREE_DATA;
     }
private handleMediaChange(mediaChange: MediaChange) {
if (this.media.isActive('lt-md')) {
        this.opened =false;
      }
else {
        this.opened = true;
      }
}

ngOnDestroy(): void {
this.mediaWatcher.unsubscribe();
}

  ngOnInit(): void {
  }

  // tree node function
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      url: node.url,
      icon: node.icon
    };
  }
  treeControl = new FlatTreeControl<FlatNode> (
   node => node.level,
   node => node.expandable 
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  )

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode) => node.expandable;
}
