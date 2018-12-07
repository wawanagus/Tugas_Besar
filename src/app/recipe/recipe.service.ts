import { Injectable} from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingEditComponent } from '../shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  //property:class recipe
  private recipes:Recipe[]=[
    new Recipe('Recipe','Recipe is an arrangement of instructions or an algorithm that shows how to make a dish.',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',[
      new Ingredient('meal',1),
      new Ingredient('tomato',2)
    ]),
    new Recipe('Ikan Bakar','Ikan bakar is an Indonesian or Malaysian dish of charcoal-grilled fish or other forms of seafood. Ikan bakar literally means "burned fish" in Malay and Indonesian. The barbecued fish is one of the classic Indonesian dish.','../src/app/img/ikan.jpg',[
      new Ingredient('rice',1),
      new Ingredient('meal',3),
      new Ingredient('egg',1)
    ]),
  ];
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes(){
    return this.recipes.slice();
  }
  addIngredientsShoppingList(ingredients:Ingredient[]){
    this.slsService.addIngredients(ingredients);
  }

  getRecipe(index:number){
    return this.recipes[index];
  }

  addRecipe(recipe :Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index :number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

constructor(private slsService:ShoppingListService) { }

}
