import azure.functions as func
from azure.cosmos import CosmosClient
import os
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

conn_str = os.environ["AzureResumeConnectionString"]

client = CosmosClient.from_connection_string(conn_str)
database = client.get_database_client("AzureResume")
container = database.get_container_client("Counter")


@app.function_name(name="GetVisitorCount")
@app.route(route="GetResumeCounter", methods=["GET"])
def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        item = container.read_item(
            item="1",
            partition_key="1"
        )

        item["count"] += 1

        container.replace_item(
            item=item,
            body=item
        )

        return func.HttpResponse(
            json.dumps({"count": item["count"]}),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        return func.HttpResponse(
            str(e),
            status_code=500
        )
