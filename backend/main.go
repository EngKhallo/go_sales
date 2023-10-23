package main

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"net/http"
	"time"
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

type Sale struct {
	ID          primitive.ObjectID `json:"_id" bson:"_id"`
	ProductID   primitive.ObjectID `json:"product_id" bson:"product_id"`
	SaleDate    time.Time          `json:"sale_date" bson:"sale_date"`
	Quantity    int                `json:"quantity" bson:"quantity"`
	TotalAmount float64            `json:"total_amount" bson:"total_amount"`
	Currency    string             `json:"currency" bson:"currency"`
	Customer    string             `json:"customer" bson:"customer"`
}

type SaleWithProduct struct {
	Sale
	ProductName  string  `json:"product_name" bson:"product_name"`
	CostPrice    float64 `json:"cost_price" bson:"cost_price"`
	TotalRevenue float64 `json:"total_revenue" bson:"total_revenue"`
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

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173/"} // Replace with your React app's URL
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	r.Use(cors.New(config))

	r.GET("/users", getAllUsers)
	r.POST("/signup", signUpUser)

	r.POST("/login", loginUser)

	r.GET("/inventory", getAllInventories)
	r.POST("/inventory", AddNewInventoryItem)
	r.GET("/sales", getAllSales)
	r.POST("/sales", AddNewSale)

	protected := r.Group("/protected")
	protected.Use(authMiddleware())
	{
		protected.GET("/sales", getAllSales)
	}
	// r.GET("/verify/:id", verifyOTP) // New route for email verification

	r.Run(":8080")
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")

		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized. Please log in."})
			c.Abort()
			return
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method")
			}

			// Replace with your actual secret key
			return []byte("myToken"), nil
		})

		if err != nil || !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized. Please log in."})
			c.Abort()
			return
		}

		// If the token is valid, proceed to the next handler
		c.Next()
	}
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

	// // Generate a random OTP for email verification
	// newUser.OTP = generateOTP()
	// newUser.OTPExpiration = time.Now().Add(15 * time.Minute) // OTP expiration time

	// Send the OTP to the user's email
	// if err := sendOTPByEmail(newUser.Email, newUser.OTP); err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send OTP email"})
	// 	return
	// }

	// Get the Users collection
	collection := client.Database("go_sales").Collection("users")

	// Insert data
	_, err := collection.InsertOne(context.TODO(), newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	token, err := generateToken(newUser) // Implement this function
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
		return
	}

	// Return actual data
	c.JSON(http.StatusCreated, gin.H{"User": newUser, "token": token})
}

func loginUser(c *gin.Context) {
	var inputUser User

	if err := c.ShouldBindJSON(&inputUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find the user by email
	collection := client.Database("go_sales").Collection("users")
	var dbUser User
	if err := collection.FindOne(context.Background(), bson.M{"email": inputUser.Email}).Decode(&dbUser); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Compare the password
	if inputUser.Password != dbUser.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	// Generate a JWT token
	token, err := generateToken(inputUser) // Implement this function
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Token generation failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login Successful", "token": token})
}

func generateToken(user User) (string, error) {
	// Create a new token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set claims (payload) for the token
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = user.ID.Hex()                        // Assuming you have a user ID
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix() // Token expiration time

	// Sign the token with a secret key
	tokenString, err := token.SignedString([]byte("your-secret-key")) // Replace with your actual secret key

	if err != nil {
		return "", err
	}

	return tokenString, nil
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

func getAllSales(c *gin.Context) {
	collection := client.Database("go_sales").Collection("sales")
	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch sales"})
		return
	}

	var sales []SaleWithProduct
	for cur.Next(context.Background()) {
		var sale Sale
		if err := cur.Decode(&sale); err != nil {
			log.Printf("Error decoding book: %v", err)
			continue
		}
		// Get the product based on the product_id
		productCollection := client.Database("go_sales").Collection("inventories")
		productFilter := bson.M{"_id": sale.ProductID}
		var product Inventory
		if err := productCollection.FindOne(context.Background(), productFilter).Decode(&product); err != nil {
			log.Printf("Error getting product: %v", err)
		}

		// Calculate the total revenue
		totalRevenue := sale.TotalAmount - product.CostPrice

		// Create a new struct to include product name and revenue
		saleWithProduct := SaleWithProduct{
			Sale:         sale,
			ProductName:  product.ProductName,
			CostPrice:    product.CostPrice,
			TotalRevenue: totalRevenue,
		}

		sales = append(sales, saleWithProduct)
	}

	c.JSON(http.StatusOK, sales)
}

func AddNewSale(c *gin.Context) {
	var newSale Sale

	if err := c.ShouldBindJSON(&newSale); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	newSale.ID = primitive.NewObjectID()

	collection := client.Database("go_sales").Collection("sales")

	_, err := collection.InsertOne(context.TODO(), newSale)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newSale)
}
