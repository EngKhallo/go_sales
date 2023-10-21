package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	Name         string             `json:"name" bson:"name"`
	Email        string             `json:"email" bson:"email"`
	MobileNumber string             `json:"mobile_number" bson:"mobile_number"`
	ProfileImage string             `json:"profile_image" bson:"profile_image"`
	Password     string             `json:"password" bson:"password"`
}

type Inventory struct {
	ID           primitive.ObjectID `json:"_id" bson:"_id"`
	ProductName  string             `json:"product_name" bson:"product_name"`
	ExpireDate   time.Time          `json:"expire_date" bson:"expire_date"`
	CostPrice    float64            `json:"cost_price" bson:"cost_price"`
	SellingPrice float64            `json:"selling_price" bson:"selling_price"`
	Currency     string             `json:"currency" bson:"currency"`
	Description  string             `json:"description" bson:"description"`
	ProductImage string             `json:"product_image" bson:"product_image"`
}

var client *mongo.Client

func main() {
	r := gin.Default()

	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	var err error
	client, err = mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// check connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	r.GET("/users", getAllUsers)
	r.POST("/users", signUpUser)

	r.GET("/inventory", getAllInventories)
	r.POST("/inventory", AddNewInventoryItem)

	r.Run(":8080")
}

func getAllUsers(c *gin.Context) {
	collection := client.Database("go_sales").Collection("users")
	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	var users []User
	for cur.Next(context.Background()) {
		var user User
		if err := cur.Decode(&user); err != nil {
			log.Printf("Error decoding book: %v", err)
			continue
		}
		users = append(users, user)
	}

	c.JSON(http.StatusOK, users)
}

func signUpUser(c *gin.Context) {
	var newUser User

	// Bind the JSON data from the request body to the newUser struct
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newUser.ID = primitive.NewObjectID()

	//Get the Users collection
	collection := client.Database("go_sales").Collection("users")

	// Insert data
	_, err := collection.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// return actual data
	c.JSON(http.StatusCreated, newUser)
}

func getAllInventories(c *gin.Context) {
	collection := client.Database("go_sales").Collection("inventories")
	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch Inventory items"})
		return
	}

	var inventories []Inventory
	for cur.Next(context.Background()) {
		var inventory Inventory
		if err := cur.Decode(&inventory); err != nil {
			log.Printf("Error decoding inventory: %v", err)
			continue
		}
		inventories = append(inventories, inventory)
	}
	
	c.JSON(http.StatusOK, inventories)
}

func AddNewInventoryItem(c *gin.Context) {
	var newInventory Inventory

	if err := c.ShouldBindJSON(&newInventory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	newInventory.ID = primitive.NewObjectID()

	collection := client.Database("go_sales").Collection("inventories")

	_, err := collection.InsertOne(context.TODO(), newInventory)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newInventory)
}
